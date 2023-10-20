// src/app/services/kvMock.ts
let kvStore: { [key: string]: any } = {};

const kvMock = {
  get: async (key: string): Promise<any> => kvStore[key],
  set: async (key: string, value: any): Promise<void> => { kvStore[key] = value; },
};

export default kvMock;