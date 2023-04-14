import * as MonoUtils from "@fermuch/monoutils";

// based on settingsSchema @ package.json
type Config = {
  interfaceColor?: 'default' | 'dark' | 'light';
  loginKeyboardType?:
      'default'
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'phone-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  enableVolumeControl: boolean;
  volume?: number; // (0-100, depends on enableVolumeControl)
  enableBrightnessControl: boolean;
  brightness?: number; // (0-100, depends on enableBrightnessControl)
}

const conf = new MonoUtils.config.Config<Config>();

messages.on('onInit', function() {
  platform.log('interface script started');

  const interfaceColor = conf.get('interfaceColor', 'default');
  if (interfaceColor !== 'default') {
    if (interfaceColor === 'dark') {
      env.setData('SET_DARK_MODE', true);
    } else {
      env.setData('SET_DARK_MODE', false);
    }
  }

  const loginKeyboardType = conf.get('loginKeyboardType', 'default');
  if (loginKeyboardType !== 'default') {
    env.setData('LOGIN_KEYBOARD_TYPE', loginKeyboardType);
  }

  const doc = MonoUtils.collections.getFrotaDoc()
  if (env.data.APP_VERSION !== doc.data.appVer) {
    doc.set('appVer', String(env.data.APP_VERSION));
  }

  if (conf.get('enableVolumeControl', false)) {
    const volume = Number(conf.get('volume', 100)) / 100;
    env.setData('FORCE_VOLUME_LEVEL', volume);
  }

  if (conf.get('enableBrightnessControl', false)) {
    const volume = Number(conf.get('brightness', 100)) / 100;
    env.setData('FORCE_BRIGTHNESS_LEVEL', volume);
  }
});

messages.on('onPeriodic', () => {
  const pulsusId = env.data.PULSUS_ID as string;
  if (!pulsusId) {
    return;
  }
  const doc = MonoUtils.collections.getFrotaDoc();
  if (typeof pulsusId === 'string' && doc.data?.pulsusId !== pulsusId) {
    doc.set('pulsusId', pulsusId)
  }
})