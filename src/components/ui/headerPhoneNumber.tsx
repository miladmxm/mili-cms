import Link from "next/link";

const PhoneNumber = () => {
  return (
    <Link
      className="text-primary-900 hover:text-secondary-500 font-medium text-xs md:text-lg"
      href="tel:09121582449"
      target="_blank"
    >
      شماره تماس: ۲۴۴۹ ۱۵۸ ۰۹۱۲
    </Link>
  );
};

export default PhoneNumber;
