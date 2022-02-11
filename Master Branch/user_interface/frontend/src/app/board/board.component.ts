import { Component, OnInit } from '@angular/core';
import { BoardInfoService } from './board.service';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


export interface Section {
  name: string;
  updated: string;
}

export interface PeriodicElement {
  ticket: string;
  market: string;
  unit: string;
  s_l: string;
  t_p: string;
  price: string;
}

export interface PeriodicElementActivity {
  market: string;
  long: string;
  short: string;
  netUnit: string;
  marginUSD: string;
  exposureUSD: string;
  avgShortPrice: string;
  currentLong: string;
  profit: string;
  profitPIPS: string;
  profitPer: string;
}

export interface PeriodicElementOrders {
  type: string;
  ticket: string;
  market: string;
  units: string;
  price: string;
  state: string;
  expiry: string;
}


// const ELEMENT_DATA: PeriodicElement[] = [
//   {type: 'Long', ticket: 'Hydrogen', market: '1.0079', unit: 'H', s_l: 'H', t_p: 'H', price: 'H'}
// ];

// const ELEMENT_DATA_ACTIVITY: PeriodicElementActivity[] = [
//   {
//     market: 'AUD/USD', long: '0', short: '2', 
//     netUnit: '-2', marginUSD: '0.00006', exposureUSD: '1.55', 
//     avgShortPrice: '1.025665', currentLong: '1.0255', profit: '-0.5558', 
//     profitPIPS: '-37', profitPer: '-0.04'},
// ];
  

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  folders = [];

  username = '';
  displayedColumns: string[] = [
    'ticket', 
    'market', 
    'unit', 
    's_l', 
    't_p', 
    'price'
  ];
  displayedColumns_trade: string[] = [
    'ticket', 
    'market', 
    'unit', 
    's_l', 
    't_p', 
    'price'
  ];
  displayedColumns_position: string[] = [
    'market',
    'long',
    'short',
    'netUnit',
    'marginUSD',
    'exposureUSD',
    'avgShortPrice',
    'currentLong',
    'profit',
    'profitPIPS',
    'profitPer'];
  displayedColumns_order: string[] = [
    'type',
    'ticket',
    'market',
    'units',
    'price',
    'state',
    'expiry'];
  dataSource = [];
  // dataSource = ELEMENT_DATA;
  dataSource_activity = [];
  dataSource_order = [];
  // dataSource_activity= ELEMENT_DATA_ACTIVITY;
  progress = 0;
  constructor(private Boardservice : BoardInfoService) { 
    
  }

  // ionViewDidLoad(){
  //   setTimeout(() => {
  //     console.log('after every 5 sec')
  //   }, 5000);
  // }
  ngOnInit() {
    console.log("in dashboard")
    console.log("first name: "+localStorage.getItem('firstName'));
    this.callDashaordAPI();

    setInterval( () => {
      console.log('after every 60 sec');
      this.callDashaordAPI();
  }, 6000);
    
  }

  callDashaordAPI(){
    // API to get account details
    this.Boardservice.getAccount('101-001-17903846-001','134a6d0ca4bdda949dcdb5ceb0dac305-259814df030964c09cd8b23bfe110a70').subscribe((success:any)=>{      
      console.log(success);
      this.getAccountDetails(success);
    }
    ,(error:any)=>{
      console.log(error);
    }
    );

    // API to get Trades details for account
    this.Boardservice.getTrades('101-001-17903846-001','134a6d0ca4bdda949dcdb5ceb0dac305-259814df030964c09cd8b23bfe110a70').subscribe((success:any)=>{      
      console.log(success);
      this.getTradeDetails(success);
    }
    ,(error:any)=>{
      console.log(error);
    }
    );

    // API to get Trades details for order
    this.Boardservice.getorders('101-001-17903846-001','134a6d0ca4bdda949dcdb5ceb0dac305-259814df030964c09cd8b23bfe110a70').subscribe((success:any)=>{      
      console.log(success);
      this.getAccountOrders(success);
    }
    ,(error:any)=>{
      console.log(error);
    }
    );

    // API to get Trades details for open possition
    this.Boardservice.getPosition('101-001-17903846-001','134a6d0ca4bdda949dcdb5ceb0dac305-259814df030964c09cd8b23bfe110a70').subscribe((success:any)=>{      
      console.log(success);
      this.getAccountPosition(success);
    }
    ,(error:any)=>{
      console.log(error);
    }
    );
  }

  getAccountDetails(success){
    this.folders = [
      {
        name: 'Net Asset Value',
        updated: success.account.NAV,
      },
      {
        name: 'Unrealized P&L',
        updated: success.account.unrealizedPL,
      },
      {
        name: 'Balance',
        updated: success.account.balance,
      },
      {
        name: 'Margin Available',
        updated: success.account.marginAvailable,
      },
      {
        name: 'Margin Call Margin Used',
        updated: success.account.marginCallMarginUsed,
      },
      {
        name: 'Margin Call Percent',
        updated: success.account.marginCallPercent,
      },
      {
        name: 'Margin Closeout Margin Used',
        updated: success.account.marginCloseoutMarginUsed,
      },
      {
        name: 'Margin Closeout NAV',
        updated: success.account.marginCloseoutNAV,
      },
      {
        name: 'Margin Closeout Percent',
        updated: success.account.marginCloseoutPercent,
      },
      {
        name: 'Margin Closeout Position Value',
        updated: success.account.marginCloseoutPositionValue,
      },
      {
        name: 'Margin Closeout Unrealized PL',
        updated: success.account.marginCloseoutUnrealizedPL,
      },
      {
        name: 'Margin Rate',
        updated: success.account.marginRate,
      },
      {
        name: 'Margin Used',
        updated: success.account.marginUsed,
      },
      {
        name: 'Position Value',
        updated: success.account.positionValue,
      }
    ];
  }

  getAccountOrders(success){
    let positionData = [];
    for(let key in success.orders) {
      console.log(success.orders[key]);
      let position_single_data = {
        type: success.orders[key].type, 
        ticket: success.orders[key].id, 
        market: success.orders[key].instrument, 
        unit: success.orders[key].units, 
        price: success.orders[key].price, 
        state: success.orders[key].state, 
        expiry: success.orders[key].timeInForce
      };
      positionData.push(position_single_data);
    }
    
    const ELEMENT_DATA_ORDERS: PeriodicElementOrders[] = positionData;
    this.dataSource_order= ELEMENT_DATA_ORDERS;
  }

  getAccountPosition(success){
    let positionData = [];
    for(let key in success.positions) {
      console.log(success.positions[key]);
      let position_single_data = {
        market: success.positions[key].instrument, 
        long: success.positions[key].long.units, 
        short: success.positions[key].short.units, 
        netUnit: success.positions[key].short.units, 
        marginUSD: '0.00006', 
        exposureUSD: '1.55', 
        avgShortPrice: '1.025665', 
        currentLong: '1.0255', 
        profit: '-0.5558', 
        profitPIPS: '-37', 
        profitPer: '-0.04'
      };
      positionData.push(position_single_data);
    }
    
    const ELEMENT_DATA_ACTIVITY: PeriodicElementActivity[] = positionData;
    this.dataSource_activity= ELEMENT_DATA_ACTIVITY;
  }

  getTradeDetails(success){
    
    let positionData = [];
    for(let key in success.trades) {
      console.log(success.trades[key]);
      
      let stopLossPrice = '';
      let takeProfitPrice = '';
      
      if("stopLossOrder" in success.trades[key]){
        stopLossPrice = success.trades[key].stopLossOrder.price
      }else{ 
        stopLossPrice = ''
      }
      if("takeProfitOrder" in success.trades[key]){
        takeProfitPrice = success.trades[key].stopLossOrder.price
      }else{ 
        takeProfitPrice = ''
      }
      let position_single_data = {
        ticket: success.trades[key].id, 
        market: success.trades[key].instrument, 
        unit: success.trades[key].initialUnits, 
        s_l: stopLossPrice, 
        t_p: takeProfitPrice, 
        price: success.trades[key].price
      };
      positionData.push(position_single_data);
    }
    
    const ELEMENT_DATA: PeriodicElement[] = positionData;
    this.dataSource = ELEMENT_DATA;
    // const ELEMENT_DATA_ACTIVITY: PeriodicElementActivity[] = positionData;
    // this.dataSource_activity= ELEMENT_DATA_ACTIVITY;
  }


  ngOnDestroy() {
  
  }

}

