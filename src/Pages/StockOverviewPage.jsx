import StockList from '../componenets/StockList'
import AutoComplete from '../componenets/AutoComplete'
export default function StockOverviewPage(){
    return(
        <div>
            <AutoComplete/>
            <StockList/>
        </div>  
    ) 
}