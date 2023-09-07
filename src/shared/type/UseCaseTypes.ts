
const USECASETYPES = {
  CreateIngredientUseCase: Symbol.for('CreateIngredientUseCase'),
  ListIngredientUseCase: Symbol.for('ListIngredientUseCase'),

  CreateDishUseCase: Symbol.for('CreateDishtUseCase'),
  ListDishUseCase: Symbol.for('ListDishtUseCase'),

  CreateUserUseCase: Symbol.for('CreateUserUseCase'),
  ListUserUseCase: Symbol.for('ListUserUseCase'),

  CreateMenuUseCase: Symbol.for('CreateMenuUseCase'),
  RetrieveMenuUseCase: Symbol.for('RetrieveMenuUseCase'),
  ListMenuUseCase: Symbol.for('ListMenuUseCase')
};

export { USECASETYPES };
