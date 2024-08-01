export const customerKeys = {
    "Full Name": (item) => `${item.firstName} ${item.lastName}`,
    "Phone": (item) => item.phoneNumber || '',
    "VIP Type": (item) => item.vipType || '',
    "Balance": (item) => item.balance || '', //not in spring boot yet
    "Birthday": (item) => {
      const birthDate = new Date(item.birthDay);
      const day = String(birthDate.getUTCDate()).padStart(2, '0');
      const month = String(birthDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
      return `${day}/${month}`;
    },
    "Past Services": (item) => item.pastServices.map(service => {
      const formattedService = {};
      for (const [key, formatter] of Object.entries(pastServicesKeys)) {
        formattedService[key] = formatter(service);
      }
      return formattedService;
    })

}

export const pastServicesKeys = {
  "Date": (service) => {
    const serviceDate = new Date(service.serviceDate);
    const year = serviceDate.getFullYear();
    const month = String(serviceDate.getMonth() + 1).padStart(2, '0');
    const day = String(serviceDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  "Service type": (service) => service.type || '', // Placeholder, assuming you don't have this data
  "Served by": (service) => service.servedBy || '',
  "Tips": (service) => service.tips || '',
  "Service Amount": (service) => service.amount ||'',
  "Total Paid Amount": (service) => service.totalPaid || '',
  "Payment method": (service) => service.paymentMethod || ''
};
