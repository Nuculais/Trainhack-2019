import {
  mount,
  route,
  compose,
} from 'navi';

const preferDefault = ((module) => module.default ? module.default : module);

const Noop = () => null;

export default compose(
  mount({
    '/': route({
      title: 'IndexView',
      getView: async () => {
        return await import('../views/IndexView').then(preferDefault);
      },
    }),
    '/character': route({
      title: 'CharacterChooseView',
      getView: async () => {
        return await import('../views/CharacterChooseView').then(preferDefault);
      },
    }),
    '/visualization': route({
      title: 'Visualization',
      getView: async () => {
        return await import('../views/VisualizeView').then(preferDefault);
      },
    }),
  }),
);
