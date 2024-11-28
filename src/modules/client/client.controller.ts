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
   console.log(req.query,"check query")
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
const getClientById = catchAsync(async (req: Request, res: Response) => {
    const id=req.params.id 
    
    const result =await ClientService.getClientById(id)

  sendResponse<IClient>(res, {
    success: true,
    statusCode: 200,

    message: "Client   retrived successfully",
    data:result
  });
});
const updateSingleClient = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const id=req.params.id

  console.log(req.body)
  const file=req.file


  
  if (file) {
    data.projectListing = {
      fileName: file.filename,
      filePath: file.path,
      fileType: file.mimetype,
    };}
    const { name,...clientProfile}=data



 const result = await ClientService.updateSingleClient(id,name,clientProfile);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: `client  account  updated    successfully`,
    data: result,
  });
});

export const ClientController = { createClient, getClients,updateSingleClient ,getClientById};
