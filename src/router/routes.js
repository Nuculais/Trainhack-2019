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
  }),
);
