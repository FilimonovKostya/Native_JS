import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import { IGlobalState } from '../../redux/state';
import { CurrencyState, CurrencyType } from '../../redux/currencyReducer';
import { compose } from 'redux';
import {
  setAction,
  setCurrencyAmount,
  changeCurrency,
} from '../../redux/actions';

interface ICurrencyProps extends CurrencyState {
  // setCurrencyAmount: (amountOfBYN: string, amountOfCurrency: string) => void;
  // setAction: (isBuying: boolean) => void;
  // changeCurrency: (currency: string) => void;
}

const CurrencyEContainer: React.FunctionComponent<ICurrencyProps> = ({
                                                                       // setCurrencyAmount,
                                                                       // setAction,
                                                                       // changeCurrency,
                                                                     }) => {

  // const currencies = useSelector<IGlobalState, Array<CurrencyType>>(state => state.currency.currencies);
  // const currentCurrency = useSelector<IGlobalState, string>(state => state.currency.currentCurrency);
  // const isBuying = useSelector<IGlobalState, boolean>(state => state.currency.isBuying);
  // const amountOfBYN = useSelector<IGlobalState, string>(state => state.currency.amountOfBYN);
  // const amountOfCurrency = useSelector<IGlobalState, string>(state => state.currency.amountOfBYN);

  const stateFromReducer = useSelector<IGlobalState, CurrencyState>(state => state.currency);
  const currencies = stateFromReducer.currencies;
  const currentCurrency = stateFromReducer.currentCurrency;
  const isBuying = stateFromReducer.isBuying;
  const amountOfCurrency = stateFromReducer.amountOfCurrency;
  const amountOfBYN = stateFromReducer.amountOfBYN;

  const action = useDispatch();

  let currencyRate: number = 0;
  const currenciesName = currencies.map((currency) => {
    if (currency.currencyName === currentCurrency) {
      currencyRate = isBuying ? currency.buyRate : currency.sellRate;
    }
    return currency.currencyName;
  });

  const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if (!isFinite(+value)) return;
    if (e.currentTarget.dataset.currency) {
      const trigger: string = e.currentTarget.dataset.currency;
      if (trigger === 'byn') {
        if (value === '') {
          // setCurrencyAmount(value, value);
          action(setCurrencyAmount(value, value));
        } else {
          // setCurrencyAmount(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2));
          action(setCurrencyAmount(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2)));
        }
      } else {
        if (value === '') {
          // setCurrencyAmount(value, value);
          action(setCurrencyAmount(value, value));
        } else {
          // setCurrencyAmount((+Number(value).toFixed(2) * currencyRate).toFixed(2), value);
          action(setCurrencyAmount((+Number(value).toFixed(2) * currencyRate).toFixed(2), value));
        }
      }
    }
  };
  const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.dataset.action === 'buy' ? action(setAction(true)) : action(setAction(false));
    // e.currentTarget.dataset.action === 'buy' ? setAction(true) : setAction(false);
  };

  const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
    e.currentTarget.dataset.currency && action(changeCurrency(e.currentTarget.dataset.currency))
    // e.currentTarget.dataset.currency && changeCurrency(e.currentTarget.dataset.currency);
  };

  return (
    <React.Fragment>
      <CurrencyExchange
        currenciesName={currenciesName}
        currentCurrency={currentCurrency}
        currencyRate={currencyRate}
        isBuying={isBuying}
        amountOfBYN={amountOfBYN}
        amountOfCurrency={amountOfCurrency}
        changeCurrencyField={changeCurrencyField}
        changeAction={changeAction}
        changeCurrentCurrency={changeCurrentCurrency}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: IGlobalState) => {
  return {
    currencies: state.currency.currencies,
    currentCurrency: state.currency.currentCurrency,
    isBuying: state.currency.isBuying,
    amountOfBYN: state.currency.amountOfBYN,
    amountOfCurrency: state.currency.amountOfCurrency,
  };
};

// const mapDispatchToProps = (dispatch: Dispatch<CurrencyReducersTypes>) => {
//   return {
//     setCurrencyAmount(amountOfBYN: string, amountOfCurrency: string) {
//       dispatch(setCurrencyAmount(amountOfBYN, amountOfCurrency));
//     },
//     setAction(isBuying: boolean) {
//       dispatch(setAction(isBuying));
//     },
//     changeCurrency(currency: string) {
//       dispatch(changeCurrency(currency));
//     },
//   };
// };

export const CurrencyExchangeContainer = compose(connect(mapStateToProps, {
  setCurrencyAmount,
  setAction,
  changeCurrency,
}))(CurrencyEContainer);