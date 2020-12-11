export enum ACTIONS_TYPE {
  CHANGE_CURRENCY_FIELD_TYPE = 'CurrencyExchange/CHANGE_CURRENCY_FIELD_TYPE',
  CHANGE_CHANGE_ACTION = 'CurrencyExchange/CHANGE_CHANGE_ACTION',
  CHANGE_CURRENT_CURRENCY = 'CurrencyExchange/CHANGE_CURRENT_CURRENCY',
}

export type ChangeCurrencyFieldType = {
  type: ACTIONS_TYPE.CHANGE_CURRENCY_FIELD_TYPE
  amountOfBYN: string
  amountOfCurrency: string
};

export const setCurrencyAmount = (amountOfBYN: string, amountOfCurrency: string): ChangeCurrencyFieldType => {
  return { type: ACTIONS_TYPE.CHANGE_CURRENCY_FIELD_TYPE, amountOfBYN, amountOfCurrency };
};

export type ChangeAction = {
  type: ACTIONS_TYPE.CHANGE_CHANGE_ACTION
  isBuying: boolean
};

export const setAction = (isBuying: boolean): ChangeAction => {
  return { type: ACTIONS_TYPE.CHANGE_CHANGE_ACTION, isBuying };
};

export type ChangeCurrentCurrencyType = {
  type: ACTIONS_TYPE.CHANGE_CURRENT_CURRENCY
  currentCurrency: string
};

export const changeCurrency = (currentCurrency: string): ChangeCurrentCurrencyType => {
  return { type: ACTIONS_TYPE.CHANGE_CURRENT_CURRENCY, currentCurrency };
};

export type CurrencyReducersTypes = ChangeCurrencyFieldType | ChangeAction | ChangeCurrentCurrencyType;
