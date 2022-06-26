import Axios from "axios";
export interface BalanceResponseItemInteface{
  balance: number;
  contract_address: string;
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  quote: number;
  logo_url: string;

}
export interface BalanceResponseInterface{
  address: string;
  items: BalanceResponseItemInteface[];
}

export interface TransactionReciept {
  to_address: string;
  from_address: string;
  log_events: [];
}
export interface TransactionResponseInterface {
  address: string;
  items: Array<TransactionReciept>;
}
export interface AddressMetadata {
  numberOfTransactions: number;
  isContract: boolean;
}
const COVALENT_API_KEY = "ckey_831994ea5e524962bc9a27acfad"; 
//>>> curl -X GET https://api.covalenthq.com/v1/ENDPOINT/?key=API_KEY
const CHAIN_ID = 1;
const COVALENT_REQUEST_URI = "https://api.covalenthq.com/v1";
const COVALENT_BASE_URI = `${COVALENT_REQUEST_URI}/${CHAIN_ID}`;
export const fetchBalanceData = async (address: string) => {
    const requestUri = `${COVALENT_BASE_URI}/address/${address}/balances_v2/?key=${COVALENT_API_KEY}`
    const response = await Axios.get(requestUri);
    const parsedResponse = response.data.data;
    console.log(parsedResponse);
    return parsedResponse;
}



export const fetchTransactionData = async (address: string) => {
    const requestUri = `${COVALENT_BASE_URI}/address/${address}/transactions_v2/?key=${COVALENT_API_KEY}`;
    const response = await Axios.get(requestUri);
    // console.log(response.data.data);
    const parsedResponse = response.data.data as TransactionResponseInterface;
    // console.log("word");
    const f = parsedResponse as TransactionResponseInterface;
    //console.log(f.items.length);
    return f;
}



/* Transcation map */
/* functionality: creates map of all transactions addressees and number of times transacted with */
export const parseIntoMap = (
  jsonResponse: TransactionResponseInterface,
  userAddress: string
) => {
  console.log("parseintoMap called");

  const transactionMap = new Map<string, AddressMetadata>();
  //transaction map
  jsonResponse.items.forEach((o) => {
    //iterate through each transaction
    if (o.to_address != userAddress) {
      //initial user is sender
      const address = o.to_address; //get to_address of trxn
      const logEvents = o.log_events; //gets array of log events
      /* get transaction count */
      if (transactionMap.has(address)) {
        transactionMap.set(address, {
          numberOfTransactions:
            (transactionMap.get(address) as AddressMetadata)
              .numberOfTransactions + 1,
          isContract: false,
        });
      } else {
        transactionMap.set(address, {
          numberOfTransactions: 1,
          isContract: false,
        });
      }
      //set isContract to be true if there is any info in log_events
      if (logEvents.length > 0) {
        transactionMap.set(address, {
          numberOfTransactions: (transactionMap.get(address) as AddressMetadata)
            .numberOfTransactions,
          isContract: true,
        });
      }
    } else if (o.to_address == userAddress) {
      //initial user is recipient
      const address = o.from_address; //get to_address of trxn
      const logEvents = o.log_events; //gets array of log events
      /* get transaction count */
      if (transactionMap.has(address)) {
        transactionMap.set(address, {
          numberOfTransactions:
            (transactionMap.get(address) as AddressMetadata)
              .numberOfTransactions + 1,
          isContract: false,
        });
      } else {
        transactionMap.set(address, {
          numberOfTransactions: 1,
          isContract: false,
        });
      }
    }
  });
  console.log(transactionMap); //output to console

  return transactionMap;
};
