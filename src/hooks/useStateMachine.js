// src/useStateMachine.js
import { useState, useRef, useCallback } from "react";

import {apartmentFinderMachine,  getApartmentsForTerminalState} from "../apartments";
import StateMachine from "../stateMachine";

// Helper function to create a fresh state machine and initial message
function createInitialState() {
  
  const machine = new StateMachine(apartmentFinderMachine);
  return {
    machine,
    messages: [
      {
        id: Date.now(),
        text: machine.message,
        sender: "bot",
        timestamp: new Date(),
      },
    ],
  };
}

/**
 * Custom React hook that manages a state machine for conversational interactions.
 * 
 * This hook maintains the state of a conversation between a user and a bot, 
 * tracks repeated states to detect if the conversation is "stuck", and 
 * automatically transitions to a help state if necessary.
 * 
 * @returns {Object} An object containing:
 *   - messages {Array<Object>}: The list of conversation messages.
 *   - sendMessage {Function}: Function to send a user message and update the conversation.
 *   - reset {Function}: Function to reset the state machine and messages to their initial state.
 * 
 * @example
 * const { messages, sendMessage, reset } = useStateMachine();
 * sendMessage("Hello!");
 * reset();
 */
export function useStateMachine() {
  const machineRef = useRef(createInitialState().machine);
  const [messages, setMessages] = useState(() => createInitialState().messages);
  const stuckCountRef = useRef(0);
  const STUCK_THRESHOLD = 3;
  const currentStateRef = useRef(machineRef.current.currState);
  const userRef = useRef({})

  const sendMessage = useCallback((text) => {
    // Create the user's message
    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    // Send the input to the machine and get the bot's response
    machineRef.current.send(text);

    const newState = machineRef.current.currState;

    // Check if the state is the same as the previous one
    if (newState === currentStateRef.current) {
      stuckCountRef.current += 1;
    } else {
      // Reset the counter if the state has changed
      stuckCountRef.current = 0;
    }
    currentStateRef.current = newState;
    if (stuckCountRef.current > STUCK_THRESHOLD) {
      // Manually transition to a help state.
      machineRef.current.send("help");
      stuckCountRef.current = 0; // Reset the counter
      currentStateRef.current = machineRef.current.currState; // Update the current state
      console.log(currentStateRef.current )
    }

   
    let botText = machineRef.current.message;
    
    if (machineRef.current.isTerminal() && stuckCountRef.current===0) {
      const results = getApartmentsForTerminalState(machineRef.current.currState);
      if (results && results.length > 0) {
        // Format the results as HTML for rendering within a div
        const formattedResults = results.map((apt, idx) =>
          `<div key="${idx}" style="margin-bottom:8px;">
        <strong>${idx + 1}. ${apt.name}</strong> - Price: ${apt.price} - Beds :${apt.beds}
          </div>`
        ).join("");
        botText += `<div>Here are the ${results.length} housing I found:${formattedResults}</div>`;
      } else {
        botText += `<div>No housing found for your criteria.</div>`;
      }
    }

    const botMessage = {
      id: Date.now() + 1, // Ensure unique ID
      text: botText,
      sender: "bot",
      timestamp: new Date(),
    };
    
    
    // Update the messages state
    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
  }, []); // The dependency array is empty as it uses refs and setState's updater form

  const reset = useCallback(() => {
    const { machine, messages: initialMessages } = createInitialState();
    machineRef.current = machine;
    stuckCountRef.current = 0
    setMessages(initialMessages);
  }, []);

  return { messages, sendMessage, reset };
}