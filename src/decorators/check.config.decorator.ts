import { Context } from 'telegraf/typings/context';
import ConfigService from '../services/config.service';
import RepliableError from '../types/globals/repliable.error';
import { ConfigProperty } from '../types/services/config.service.types';
import { MemeAction } from '../types/services/meme.service.types';

// eslint-disable-next-line max-len
const CheckConfig = (property: ConfigProperty, throwError = true) => (_target: object, _propKey: string, desc: PropertyDescriptor): void => {
  const method: Function = desc.value;

  // eslint-disable-next-line no-param-reassign
  desc.value = async function wrapped(
    ...args: [Context | number, Function | number | boolean | MemeAction | undefined]
  ): Promise<object> {
    let chatId: number;

    switch (typeof args[0]) {
      case 'number': [chatId] = args; break;
      case 'object': chatId = args[0].chat!.id; break;
      default: return {};
    }

    const secondArgument = args[1];
    const isAllowed = await ConfigService.getInstance().checkProperty(chatId, property);

    if (!isAllowed) {
      if (typeof secondArgument !== 'boolean' || (typeof secondArgument === 'boolean' && secondArgument)) {
        if (typeof args[1] === 'function') {
          args[1]();
        }

        if (typeof args[0] === 'object' && throwError) {
          throw new RepliableError('Функция отключена в /config', args[0]);
        }

        return {};
      }
    }

    return method.apply(this, args);
  };
};

export default CheckConfig;
