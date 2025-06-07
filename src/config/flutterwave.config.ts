export interface FlutterwaveConfigType {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options: string;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
}

export interface FlutterwaveCustomConfigType {
  amount: number;
  currency: string;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
  };
}

const defaultConfig = {
  public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
  tx_ref: Date.now().toString(),
  amount: 0,
  currency: "NGN",
  payment_options: "card,mobilemoney,ussd",
  customizations: {
    title: "Booking payment",
    description: "Payment for event booking",
    logo: "https://res.cloudinary.com/dzzxgsrbl/image/upload/v1743669996/eventman-favicon-cropped_wwq3eq.png",
  },
};

// Make flutterware config from the deafult config and custom config
export const makeFlutterwareConfig = (
  customConfig: FlutterwaveCustomConfigType
): FlutterwaveConfigType => {
  return {
    ...defaultConfig,
    ...customConfig,
    customizations: {
      ...defaultConfig.customizations,
      ...customConfig.customizations,
    },
  };
};
