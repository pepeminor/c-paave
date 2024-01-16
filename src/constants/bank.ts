/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBank {
  id: number;
  name: string;
  image: any;
  accountBanks: IAccountBank[];
  BeneficiaryName: string;
}

export interface IAccountBank {
  id: string;
  name: string;
}

export const TAB = {
  BANK_TRANSFER: 'BANK_TRANSFER',
  AT_KIS_COUNTER: 'AT_KIS_COUNTER',
};

export const BANK_LIST = [
  {
    id: 1,
    name: 'BIDV',
    image: require('assets/icon/LogoBank/BIDV.png'),
    accountBanks: [
      {
        id: '11910000102557',
        name: 'NH TMCP Đầu tư và Phát triển VN - CN HCM',
      },
      {
        id: '22010000387414',
        name: 'NH TMCP Đầu tư và Phát triển VN - CN HN',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
  {
    id: 2,
    name: 'VIETCOMBANK',
    image: require('assets/icon/LogoBank/Vietcom.png'),
    accountBanks: [
      {
        id: '0071004630690',
        name: 'NHTMCP Ngoại Thương - CN HCM',
      },
      {
        id: '0021000248761',
        name: 'NHTMCP Ngoại Thương - CN HN',
      },
      {
        id: '0071000635933',
        name: 'NHTMCP Ngoại Thương - CN HCM',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
  {
    id: 3,
    name: 'ACB',
    image: require('assets/icon/LogoBank/ACB.png'),
    accountBanks: [
      {
        id: '77435699',
        name: 'NHTMCP Á Châu',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
  {
    id: 4,
    name: 'VIB',
    image: require('assets/icon/LogoBank/VIB.png'),
    accountBanks: [
      {
        id: '003704064448888',
        name: 'NHTMCP Quốc tế VN - CN HN',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
  {
    id: 5,
    name: 'MSB',
    image: require('assets/icon/LogoBank/MSB.png'),
    accountBanks: [
      {
        id: '040 0101 006 4837',
        name: 'NHTMCP Hàng Hải VN',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
  {
    id: 6,
    name: 'SHINHAN BANK',
    image: require('assets/icon/LogoBank/Shinhan.png'),
    accountBanks: [
      {
        id: '700 003 560 857',
        name: 'NH Shinhan VN',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
  {
    id: 7,
    name: 'MB BANK',
    image: require('assets/icon/LogoBank/MB.png'),
    accountBanks: [
      {
        id: '0571103477007',
        name: 'NHTMCP Quân Đội',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
  {
    id: 8,
    name: 'TECHCOMBANK',
    image: require('assets/icon/LogoBank/Techcom.png'),
    accountBanks: [
      {
        id: '190 213 597 20201',
        name: 'NHTMCP Kỹ Thương',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
  {
    id: 9,
    name: 'WOORI BANK',
    image: require('assets/icon/LogoBank/Woori.png'),
    accountBanks: [
      {
        id: '100 200 040725',
        name: 'NH Wooribank VN',
      },
    ],
    BeneficiaryName: 'KIS VIET NAM SECURITIES CORPORATION',
  },
  {
    id: 10,
    name: 'VIETIN BANK',
    image: require('assets/icon/LogoBank/Vietin.png'),
    accountBanks: [
      {
        id: '121 0000 47944',
        name: 'NHTMCP Công Thương - CN HCM',
      },
      {
        id: '122 0000 47943',
        name: 'NHTMCP Công Thương - CN HCM',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
  {
    id: 11,
    name: 'VP BANK',
    image: require('assets/icon/LogoBank/VP.png'),
    accountBanks: [
      {
        id: '224317368',
        name: 'NH Việt Nam Thịnh Vượng',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
  {
    id: 12,
    name: 'BANGKOK BANK',
    image: require('assets/icon/LogoBank/Bangkok.png'),
    accountBanks: [
      {
        id: '0818102919401',
        name: 'NH Bangkok Bank',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
  {
    id: 13,
    name: 'BUSAN BANK',
    image: require('assets/icon/LogoBank/Busan.png'),
    accountBanks: [
      {
        id: '132201100000239',
        name: 'NH Busan VN',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
  {
    id: 14,
    name: 'KEB HANA BANK',
    image: require('assets/icon/LogoBank/KEB.png'),
    accountBanks: [
      {
        id: '00870002560',
        name: 'NH KEB Hana CN HCM',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
  {
    id: 15,
    name: 'KOOKMIN BANK',
    image: require('assets/icon/LogoBank/Kookmin.png'),
    accountBanks: [
      {
        id: '810001220002060',
        name: 'NH Kookmin - CN HCM',
      },
    ],
    BeneficiaryName: 'CTCP CHUNG KHOAN KIS VIET NAM',
  },
] as IBank[];
