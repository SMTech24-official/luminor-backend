import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import pick from "../../shared/pick";
import { paginationFileds } from "../../constants/pagination";
import { filterableField } from "../../constants/searchableField";
import { IClient } from "./client.interface";
import { ClientService } from "./cleint.service";


const createClient = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  
    const {name,email,role,password,...others}=data

  const result = await ClientService.createClient({
    name, email, role,password
   
  },others);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: `client  account  created   successfully`,
    data: result,
  });
});


const getClients = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFileds);
  const filters = pick(req.query, filterableField);
  console.log(
    filters,
    paginationOptions,
    "i am from controller to check filters"
  );
  const result = await ClientService.getClients(
    filters,
    paginationOptions
  );

  sendResponse<IClient[]>(res, {
    success: true,
    statusCode: 200,

    message: "Clients  retrived successfully",
    meta: result.meta,
    data: result.data,
  });
});
const updateClient = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const id=req.params.id
  console.log(req.body,"check body")
  console.log(req.file,"check file")
  

  const result = await ClientService.updateSingleClient(id,data);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: `client  account  created   successfully`,
    data: result,
  });
});

export const ClientController = { createClient, getClients,updateClient };
