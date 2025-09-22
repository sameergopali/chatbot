// StateMachine class implements a simple keyword-based finite state machine
class StateMachine {
  /**
   * Creates an instance of the state machine.
   *
   * @param {Object} config - The configuration object for the state machine.
   */
  constructor(config) {
    this.states = config.states;
    this.initial = config.initial;
    this.currState = config.initial;
    this.fallbackMessage = null;
  }

  // Processes input and transitions states based on keyword matches
  send(input) {
    const stateDef = this.states[this.currState];
    this.fallbackMessage = null;
    let matches =[]

    // Match keyword transitions for the current state
    for (const [event, next] of Object.entries(stateDef.on || {})) {
      // Get keywords for this event
      const keywords = stateDef.keywords?.[event] || [];
      // Check if any keyword is present in the input
      if (keywords.length > 0) {
        // 1. Create a regex pattern from the keywords.
        // We escape special regex characters in keywords just in case (e.g., '$', '+')
        // and join them with the OR '|' operator.
        const escapedKeywords = keywords.map(k => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
        const pattern = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'i');

        // 2. Test the user's input against the pattern.
        if (pattern.test(input)) {
          matches.push({ event, next });
        }
      }

    }
    // If exactly one match, transition to the next state
    if (matches.length===1){
      let key = this.currState;
      this.currState = matches[0].next;
      return {key: key, value: matches[0].event}
    }
    // If multiple matches, ambiguous about the answer.
    if (matches.length > 1){
      this.fallbackMessage = "Multiple match in answer. " + stateDef.fallback;
      return
    }

    // If no keywords match, check for a specific fallback message
    if (stateDef.fallback) {
      this.fallbackMessage = stateDef.fallback;
      // No state change
      return
    }

  }

  // Returns the current state's message or a fallback message if set
  get message() {
    if (this.fallbackMessage) {
      return this.fallbackMessage;
    }
    return this.states[this.currState].message || null;
  }

  // Resets the state machine to the initial state
  reset(){
    this.currState = this.initial;
    this.fallbackMessage = null;
  }
  isTerminal(){
    return this.states[this.currState].terminal;
  }
}

export default StateMachine;
