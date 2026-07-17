import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      message:"backend is running successfully",
      api:"http://localhost:3000",
      customer_endpoint:"/customers",
      tickets_endpoint:"/tickets",
      swagger_api_docs:"/api/docs"
      
    }
  }
}
