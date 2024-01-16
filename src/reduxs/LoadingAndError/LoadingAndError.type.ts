export type LoadingAndErrorState = {
  /**
   * Total number of important loading
   * If important loading is greater than 0, the loading screen cannot be closed
   * Currently not implemented
   *
   * TODO: Implement important loading if needed
   */
  importanceCount: number;
  loadingMessages: string[];
  errorMessages: string[];
};
