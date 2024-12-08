import { query, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import pick from "../../shared/pick";
import { paginationFileds } from "../../constants/pagination";
import { filterableField } from "../../constants/searchableField";
import { IClient } from "./client.interface";
import { ClientService } from "./client.service";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../errors/handleApiError";
import { uploadFileToSpace } from "../../utilitis/uploadTos3";

const createClient = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  
    const {name,email,role,password,...others}=data

  const result = await ClientService.createClient({
    name, email, role,password
   
  },others);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `client  account  created   successfully`,
    data: result,
  });
});


const getClients = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFileds);
  console.log(req.query,"querty check from controller")
  const filters = pick(req.query, filterableField);
  //  console.log(req.query,"check query")
  const result = await ClientService.getClients(
    filters,
    paginationOptions
  );

  console.log(filters,"filters")
  sendResponse<IClient[]>(res, {
    success: true,
    statusCode: StatusCodes.OK,

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
    statusCode: StatusCodes.OK,

    message: "Client   retrived successfully",
    data:result
  });
});
const updateSingleClient = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const id=req.params.id

  // console.log(req.body)

  const file = req.file;
  // console.log(req.body, "check body");
  console.log(file,"check file")

  if (!file) {
     throw new ApiError(400,"file not found")
  }
  const fileUrl = await uploadFileToSpace(file, "client"); 

   console.log(req.user,"check user")
  if (file) {
    data.projectListing=fileUrl
   }
    const { name,...clientProfile}=data
   
  const auth={name:JSON.parse(name)}

 const result = await ClientService.updateSingleClient(id,auth,clientProfile);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.ACCEPTED,
    message: `client  account  updated    successfully`,
    data: result,
  });
});

export const ClientController = { createClient, getClients,updateSingleClient ,getClientById};
