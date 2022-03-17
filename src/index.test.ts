const read = require('fs').readFileSync;
const join = require('path').join;

function loadScript() {
  // import global script
  const script = read(join(__dirname, '..', 'dist', 'bundle.js')).toString('utf-8');
  eval(script);
}

describe("onInit", () => {
  // clean listeners
  afterEach(() => {
    messages.removeAllListeners();
  });

  it('runs without errors', () => {
    const colStore = {} as Record<any, any>;
    const mockCol = {
      get() {
        return {
          data: colStore,
          get: (k: string) => colStore[k],
          set: (k: string, v: any) => (colStore[k] = v),
        }
      }
    };
    (env.project as any) = {
      collectionsManager: {
        ensureExists: () => mockCol,
      },
    };

    loadScript();
    messages.emit('onInit');
  });

  it('sets interfaceColor to the given value', () => {
    const colStore = {} as Record<any, any>;
    const mockCol = {
      get() {
        return {
          data: colStore,
          get: (k: string) => colStore[k],
          set: (k: string, v: any) => (colStore[k] = v),
        }
      }
    };
    (env.project as any) = {
      collectionsManager: {
        ensureExists: () => mockCol,
      },
    };

    getSettings = () => ({
      interfaceColor: 'dark',
    });
    loadScript();
    messages.emit('onInit');

    expect(env.data.SET_DARK_MODE).toBe(true);
  });

  it('sets loginKeyboardType', () => {
    const colStore = {} as Record<any, any>;
    const mockCol = {
      get() {
        return {
          data: colStore,
          get: (k: string) => colStore[k],
          set: (k: string, v: any) => (colStore[k] = v),
        }
      }
    };
    (env.project as any) = {
      collectionsManager: {
        ensureExists: () => mockCol,
      },
    };

    getSettings = () => ({
      loginKeyboardType: 'numeric',
    });
    loadScript();
    messages.emit('onInit');

    expect(env.data.LOGIN_KEYBOARD_TYPE).toBe('numeric');
  });

  it('sets APP_VERSION', () => {
    const colStore = {} as Record<any, any>;
    const mockCol = {
      get() {
        return {
          data: colStore,
          get: (k: string) => colStore[k],
          set: (k: string, v: any) => (colStore[k] = v),
        }
      }
    };

    env.data.APP_VERSION = 'test-1.2.3';
    (env.project as any) = {
      collectionsManager: {
        ensureExists: () => mockCol,
      },
    };

    expect(colStore.appVer).toBeUndefined();

    loadScript();
    messages.emit('onInit');
    expect(colStore.appVer).toBe('test-1.2.3');
  });
});