import Axios from "axios";

export interface TransactionReciept{
    to_address: string;
}   
export interface TransactionResponseInterface {
    address: string; 
    items: Array<TransactionReciept>;
}
const COVALENT_API_KEY = "ckey_831994ea5e524962bc9a27acfad"; 
//>>> curl -X GET https://api.covalenthq.com/v1/ENDPOINT/?key=API_KEY
const CHAIN_ID = 1;
const COVALENT_REQUEST_URI = "https://api.covalenthq.com/v1";
const COVALENT_BASE_URI = `${COVALENT_REQUEST_URI}/${CHAIN_ID}`;

export const fetchTransactionData = async (address: string) => {
    const requestUri = `${COVALENT_BASE_URI}/address/${address}/transactions_v2/?key=${COVALENT_API_KEY}`;
    const response = await Axios.get(requestUri);
    // console.log(response.data.data);
    const parsedResponse = response.data.data as TransactionResponseInterface;
    // console.log("word");
    const f = parsedResponse as TransactionResponseInterface;
    //console.log(f.items.length);
}
/* Transcation map */
/* functionality: creates map of all transactions addressees and number of times transacted with */
export const parseIntoMap = (
    jsonResponse: TransactionResponseInterface,
    fromAddress: string
  ) => {
    console.log("parseintoMap called");
    const transactionMap = new Map<string, number>();
    jsonResponse.items.forEach((o) => {
      //iterate through each transaction
      if (o.to_address != fromAddress) {
        //Do not include initial user
        const address = o.to_address; //get to_address of trxn
        /* get transaction count */
        if (transactionMap.has(address)) {
          transactionMap.set(
            address,
            (transactionMap.get(address) as number) + 1
          );
        } else {
          transactionMap.set(address, 1);
        }
      }
    });
    console.log(transactionMap); //output to console
  
    return transactionMap;
  };
  