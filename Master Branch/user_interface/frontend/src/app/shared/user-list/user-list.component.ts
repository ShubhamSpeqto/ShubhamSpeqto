import { AfterContentInit, AfterViewInit,Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { SharedService } from '../shared.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,AfterViewInit,AfterContentInit {
  
  

  
  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'User Id', name: 'user_id'},
    {
      title: 'Role Type',
      name: 'role_type',
      sort: '',
      filtering: {filterString: '', placeholder: 'Filter by Role Type'}
    },
    {title: 'User Type', name: 'user_signup_type', sort: 'asc',
    filtering: {filterString: '', placeholder: 'Filter by Role Type'}},
    {title: 'Email Id', name: 'email_id', sort: ''},
    {title: 'created By', name: 'created_by', sort: ''},
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
  userid: string;
  

  constructor(private sharedservice : SharedService,
    private router: Router) {
  
   }

  collection: any =[];
  collection1: any =[];
  data1 : any='all';
  name : any;
  p:number = 1;
  
  ngAfterContentInit(){
    this.userlist();
  
  }
  ngOnInit(){
    this.userid = localStorage.getItem('userId')
  
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

  public onCellClick(data2: any,): any {
   
    let  id=data2.row.user_id
    console.log(data2);
    console.log(id);
    
    this.router.navigate(['user-list/'+id])
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


  

userlist(){
  this.sharedservice.getteamlist(localStorage.getItem('userId')).subscribe((result)=>{
    // console.log(result)
    this.collection = result;
      this.data = this.collection
      this.length = this.data.length;
      console.log(this.data);
      this.onChangeTable(this.config);
  })
}
      
      
  
    

}

  

