import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
 import { TableData } from './table-data';
 import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

//  let template = require('./user-kyc-list.component.html');

@Component({
  selector: 'app-user-kyc-list',
  templateUrl: './user-kyc-list.component.html',
  styleUrls: ['./user-kyc-list.component.css']
})
export class UserKycListComponent implements OnInit,AfterViewInit,AfterContentInit {

  // ng2 table data part-1 start

  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {
      title: 'address',
      name: 'address',
      sort: false,
      filtering: {filterString: '', placeholder: 'Filter by address'}
    },
    {title: 'kyc Id', name: 'kyc_id', sort: 'asc'},
    {title: 'occupation.', name: 'occupation', sort: '', filtering: {filterString: '', placeholder: 'Filter by extn.'}},
    {title: 'status', name: 'status'},
    // {title:,name:'action', sort: false  }  
    // {title: 'Salary ($)', name: 'salary'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data:Array<any> ;

  // ng2 table data part-1 end

  constructor(private sharedservice : SharedService,
    private router:Router) {
    // ng2 part code here 
    
    // end
   }

  collection: any =[];
  collection1: any =[];
  data1 : any='all';
  name : any;
  p:number = 1;
  
  ngAfterContentInit(){
    this.kyclist();

  }
  ngOnInit(){
    
    
    
    // ng2 part 
    // this.onChangeTable(this.config);
    // end
  }
ngAfterViewInit(){


}
  // ng2 part-2 start here

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data2: any): any {
    let  id=data2.row.kyc_id
    // console.log(data2);
    // console.log(id);
    this.router.navigate(['user-kyc-list/'+id])
    // this.sharedservice.getkycbyid(data2).subscribe((result)=>{
    //   this.collection1 = result;
    //   // this.data=result
    // })
    
  }

  // ng2 part-2 end here

pagination(){
  
}
  Search(){
    if(this.name == ""){
      this.ngOnInit();
    }
    else{
      this.collection = this.collection.filter(res=>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }
  key: string = 'id';
  reverse:boolean = false
  sort(key){
    this.key = key ;
    this.reverse = !this.reverse
  }

  kyclist(){
    
    this.sharedservice.getkyc().subscribe((result)=>{
    // console.log(user);
    
      
       this.collection = result;
       this.data = this.collection
       this.length = this.data.length;
       console.log(this.data);
       this.onChangeTable(this.config);
     }
     ,(error:any)=>{
      Swal.fire('',error.error.message,'error')

        console.log(error.error.error)
    })
  }

  getKycbyId(data1){
    this.sharedservice.getkycbyid(data1).subscribe((result)=>{
      this.collection1 = result;
      // this.data=result
    },(error:any)=>{
      Swal.fire('',error.error.message,'error')

        console.log(error.error.error)
    })

  }


      
      
  
    

}
