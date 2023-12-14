import { Test, TestingModule } from "@nestjs/testing";
import { RadiologyService } from "./radiology.service";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Radiology } from "./interface/radiology.interface";
import { NotFoundException } from "@nestjs/common";
import { userDto } from "src/users/dto/user.dto";
import { radiologyDto } from "./dto/radiology.dto";

describe("RadiologyService", () => {
  let service: RadiologyService;
  let model: Model<Radiology>;

  const mockRadiologyService = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockRadiology = {
    _id: "65514cf2fac67f45ae2ce076",
    patientId: "patientId",
    firstName: "firstName",
    lastName: "lastName",
    email: "emailoneeeell@gmail.com",
    userId: "65513ab9e3cd5b53d8472d40",
    image: "image",
    desc: "desc",
    comment: "ok",
    createdAt: "2023-11-12T22:08:50.106Z",
    updatedAt: "2023-11-15T16:20:23.465Z",
    __v: 0,
    status: "inprogress",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RadiologyService,
        { provide: getModelToken("Radiology"), useValue: mockRadiologyService },
      ],
    }).compile();

    service = module.get<RadiologyService>(RadiologyService);
    model = module.get<Model<Radiology>>(getModelToken("Radiology"));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all radiologiest", async () => {
      const query = { page: "1", keyword: "test" };
      jest.spyOn(model, "find").mockImplementation(
        () =>
          ({
            sort: () => ({
              limit: () => ({
                skip: jest.fn().mockResolvedValue([mockRadiology]),
              }),
            }),
          }) as any,
      );
      const result = await service.findAll(query);
      expect(result).toEqual([mockRadiology]);
    });
  });

  describe("findOne", () => {
    it("should return single radiology", async () => {
      jest.spyOn(model, "findOne").mockResolvedValue(mockRadiology);
      const result = await service.findOne(mockRadiology._id);
      expect(model.findOne).toHaveBeenCalledWith({ _id: mockRadiology._id });
      expect(result).toEqual(mockRadiology);
    });
    it("should throe not found exception when patient does not exist", async () => {
      jest.spyOn(model, "findOne").mockResolvedValue(null);
      expect(model.findOne).toHaveBeenCalledWith({ _id: mockRadiology._id });
      await expect(service.findOne(mockRadiology._id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("create", () => {
    it("should create new radiology", async () => {
      const mockUser = {
        id: "6548045f7f7662baefa3483f",
        firstName: "karera",
        lastName: "olivier",
        email: "kareraolivier@gmail.com",
        password: "Karera@123",
        role: "Admin",
      };
      const newRadiology = {
        patientId: "patientId",
        firstName: "firstName",
        lastName: "lastName",
        email: "emailoneeeell@gmail.com",
        userId: "65513ab9e3cd5b53d8472d40",
        image: "image",
        desc: "desc",
        comment: "ok",
      };
      jest.spyOn(model, "create").mockResolvedValue(mockRadiology as any);
      const mockRadiologys = {
        save: jest.fn().mockResolvedValue(mockRadiology),
        _id: "65514cf2fac67f45ae2ce076",
        patientId: "patientId",
        firstName: "firstName",
        lastName: "lastName",
        email: "emailoneeeell@gmail.com",
        userId: "65513ab9e3cd5b53d8472d40",
        image: "image",
        desc: "desc",
        comment: "ok",
        createdAt: "2023-11-12T22:08:50.106Z",
        updatedAt: "2023-11-15T16:20:23.465Z",
        __v: 0,
        status: "inprogress",
      };
      jest.spyOn(model, "create").mockResolvedValue(mockRadiologys as any);

      const result = await service.create(
        mockUser as userDto,
        newRadiology as Radiology,
      );

      expect(result).toEqual(mockRadiology);
      expect(mockRadiologys.save).toHaveBeenCalled();
    });
  });
});
