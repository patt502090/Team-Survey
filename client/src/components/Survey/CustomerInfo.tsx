import React from "react";
import { OCRResponse } from "../../modules/ocrSchema";
import { CustomerProps } from "../../modules/customerSchema";
interface CustomerInfoProps {
  customerData: OCRResponse;
}
const CustomerInfo: React.FC<CustomerInfoProps> = ({ customerData }) => {
  const transformedCustomerData: CustomerProps = {
    Id_Number: customerData.id_number,
    NameTitle: "",
    Name_Th: customerData.th_name,
    Name_Eng: `${customerData.en_fname} ${customerData.en_lname}`,
    Address: customerData.address,
    birthdate: customerData.th_dob,
  };
  return (
    <div className="flex flex-col items-center p-2 space-y-2">
      <h2 className="text-xl font-bold ">ขั้นตอนที่ 2 ข้อมูล</h2>
      {/* <div className="max-w-md w-full space-y-8 p-4 bg-white rounded-xl shadow-lg">
        <div className="grid gap-8 grid-cols-1">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row items-center">
              <h2 className="font-semibold text-lg mr-auto">Customer Info</h2>
            </div>
            <div className="mt-5">
              <div className="form">
                <div className="md:space-y-2 mb-3">
                  <label className="text-xs font-semibold text-gray-600 py-2">
                    Company Logo
                    <abbr className="hidden" title="required">
                      *
                    </abbr>
                  </label>
                  <div className="flex items-center justify-center py-6">
                    <div className="w-12 h-12 mr-4 flex-none rounded-xl border overflow-hidden">
                      <img
                        className="w-12 h-12 mr-4 object-cover"
                        src="https://images.unsplash.com/photo-1611867967135-0faab97d1530?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
                        alt="Avatar Upload"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                <div className="mb-3 space-y-2 w-full text-xs">
                  <label className="font-semibold text-gray-600 py-2">
                    Company Name <abbr title="required">*</abbr>
                  </label>
                  <input
                    placeholder="Company Name"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    required
                    type="text"
                    name="integration[shop_name]"
                    id="integration_shop_name"
                  />
                </div>
                <div className="mb-3 space-y-2 w-full text-xs">
                  <label className="font-semibold text-gray-600 py-2">
                    Company Email <abbr title="required">*</abbr>
                  </label>
                  <input
                    placeholder="Email ID"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    required
                    type="text"
                    name="integration[shop_email]"
                    id="integration_shop_email"
                  />
                </div>
              </div>
              <div className="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">
                  Company Website
                </label>
                <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                  <div className="flex">
                    <span className="flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-300 justify-center items-center text-xl rounded-lg text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow"
                    placeholder="https://"
                  />
                </div>
              </div>
              <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                <div className="w-full flex flex-col mb-3">
                  <label className="font-semibold text-gray-600 py-2">
                    Company Address
                  </label>
                  <input
                    placeholder="Address"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    type="text"
                    name="integration[street_address]"
                    id="integration_street_address"
                  />
                </div>
                <div className="w-full flex flex-col mb-3">
                  <label className="font-semibold text-gray-600 py-2">
                    Location <abbr title="required">*</abbr>
                  </label>
                  <select
                    className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full"
                    required
                    name="integration[city_id]"
                    id="integration_city_id"
                  >
                    <option value="">Selected location</option>
                    <option value="">Cochin, KL</option>
                    <option value="">Mumbai, MH</option>
                    <option value="">Bangalore, KA</option>
                  </select>
                </div>
              </div>
              <div className="flex-auto w-full mb-1 text-xs space-y-2">
                <label className="font-semibold text-gray-600 py-2">
                  Description
                </label>
                <textarea
                  required
                  name="message"
                  className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-4 px-4"
                  placeholder="Enter your company info"
                  spellCheck="false"
                ></textarea>
              </div>
              <p className="text-xs text-red-500 text-right my-3">
                Required fields are marked with an asterisk{" "}
                <abbr title="Required field">*</abbr>
              </p>
            </div>
          </div>
        </div>
      </div> */}{" "}
      <h2>ข้อมูลลูกค้า</h2>
      <p>
        <strong>ID Number:</strong> {transformedCustomerData.Id_Number}
      </p>
      <p>
        <strong>Name (Thai):</strong> {transformedCustomerData.Name_Th}
      </p>
      <p>
        <strong>Name (English):</strong> {transformedCustomerData.Name_Eng}
      </p>
      <p>
        <strong>Address:</strong> {transformedCustomerData.Address}
      </p>
      <p>
        <strong>Birthdate:</strong> {transformedCustomerData.birthdate}
      </p>
    </div>
  );
};

export default CustomerInfo;
