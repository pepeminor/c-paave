export interface IAddressCityData {
  cityCode: string;
  cityLabel: string;
  cityLevel: string;
  districtList: IAddressDistrictData[];
}

export interface IAddressDistrictData {
  districtLabel: string;
  districtCode: string;
  districtLevel: string;
}

export const addressData: IAddressCityData[] = require('./addressCityData.json');
