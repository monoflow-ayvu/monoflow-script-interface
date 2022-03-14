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
});