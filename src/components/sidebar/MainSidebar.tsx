import * as React from "react";

interface MenuItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, isActive = false }) => (
  <div className={`flex gap-3 px-3 py-2 mt-2 text-sm whitespace-nowrap ${isActive ? 'bg-zinc-800 rounded-xl' : ''}`}>
    <img src={icon} alt="" className="shrink-0 w-6 aspect-square" />
    <div className="flex-auto">{label}</div>
  </div>
);

interface FooterLinkProps {
  icon: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ icon, label }) => (
  <div className="flex gap-3 px-3 py-2 mt-1">
    <img src={icon} alt="" className="shrink-0 w-6 aspect-square" />
    <div className="flex-auto">{label}</div>
  </div>
);

const menuItems: MenuItemProps[] = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/197bbbce295614d639511cbe803a0d2ed1ffdc0d6960ea76f054f70b125b6928?apiKey=2a72745ec00444ad9fe2bd2391d98932&", label: "Home" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6b04c3b5b5bcc1b67545999d0156f146b5a7b0ae7361d1a8d5604a32ce03e2c?apiKey=2a72745ec00444ad9fe2bd2391d98932&", label: "Games", isActive: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a58ab295505571ef1d35a79a6f9a15e04e11a8e8e0c5017e7680997c39cb28a?apiKey=2a72745ec00444ad9fe2bd2391d98932&", label: "Tournaments" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a05ad7610acb7bbed679b0fe7022c294a202b4a856d343b58eef5f3cdc56cd2b?apiKey=2a72745ec00444ad9fe2bd2391d98932&", label: "Rewards" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/80ff5707b3386b32d9fc0757f6ea679556373f4f6acd77f2511de17a26de0bae?apiKey=2a72745ec00444ad9fe2bd2391d98932&", label: "Help" },
];

const footerLinks: FooterLinkProps[] = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/51af7150228ae8362b1fe35a9f5538b2b5a215d0c5a7e2263e981fa7ae565b51?apiKey=2a72745ec00444ad9fe2bd2391d98932&", label: "Feedback" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/132e85488f688e0e08ab1f9599ba40327a3bdc75a13b9870f2ca9737e2bad8e3?apiKey=2a72745ec00444ad9fe2bd2391d98932&", label: "Responsible Gaming" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/92ebb0ea7ef757676bb303b1e93c9619515fddcae06916eb6089aafc9e72f275?apiKey=2a72745ec00444ad9fe2bd2391d98932&", label: "Affiliates" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2cf4de4a6c6ac7d9adfabc7fa521a9a8ab42e965ab6dee4d9d0925f9198c72d5?apiKey=2a72745ec00444ad9fe2bd2391d98932&", label: "Terms of Service" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/428b62f305019605926b23c63d8976cbf953396403d1fe7ebabd43b61b59bf66?apiKey=2a72745ec00444ad9fe2bd2391d98932&", label: "Privacy Policy" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0992e08234b907c383459b4865600c85e8e3810ee35f5c4560655880ae751eb0?apiKey=2a72745ec00444ad9fe2bd2391d98932&", label: "Community Guidelines" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3a8d29fbc3c50bd97a0728fe6dd3bbfd9d2f13c70ae441ddf2c171c7d8d9fb88?apiKey=2a72745ec00444ad9fe2bd2391d98932&", label: "About Us" },
];

const NavSidebar: React.FC = () => {
  return (
    <aside className="flex flex-col justify-between p-4 text-base font-medium leading-6 text-white bg-card max-w-[307px] border-outline">
      <div className="flex gap-3">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/325591c103253905ad19cf9bd3e40d152b28ab877540bd2250eeb41027dc3798?apiKey=2a72745ec00444ad9fe2bd2391d98932&" alt="User avatar" className="shrink-0 w-10 aspect-square" />
        <div className="flex-auto self-start">Jen Martin</div>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <MenuItem key={item.label} {...item} />
        ))}
      </nav>
      <button className="flex justify-center items-center px-16 py-2.5 mt-20 text-sm font-bold tracking-wide whitespace-nowrap bg-emerald-600 rounded-xl">
        Deposit
      </button>
      <footer className="mt-4">
        {footerLinks.map((link) => (
          <FooterLink key={link.label} {...link} />
        ))}
      </footer>
    </aside>
  );
};

export default NavSidebar;