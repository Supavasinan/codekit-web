import Link from "next/link";
import { SectionContainer } from "./section-container";

export const SiteFooter = () => {
  return (
    <SectionContainer>
      <footer className="bg-background border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* แบรนด์และคำอธิบาย */}
        <div>
          <h2 className="text-lg font-semibold mb-2">ZeroDay Shop</h2>
          <p className="text-muted-foreground text-sm">
            ร้านค้าจำหน่ายสินค้ามากมาย ตอบโจทย์ในทุกผู้ใช้งาน
          </p>
        </div>

        {/* ลิงก์เมนู */}
        <div>
          <h3 className="text-sm font-medium mb-2">เมนู</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/cart" className="hover:underline">
                ตะกร้าสินค้า
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:underline">
                สินค้าทั้งหมด
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials หรือ Newsletter */}
        <div>
          <h3 className="text-sm font-medium mb-2">ติดตามเรา</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="https://github.com/" target="_blank" className="hover:underline">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://twitter.com/" target="_blank" className="hover:underline">
                Twitter (X)
              </a>
            </li>
            <li>
              <a href="https://discord.com/" target="_blank" className="hover:underline">
                Discord
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ZeroDay. All rights reserved.
      </div>
    </footer>
    </SectionContainer>
  );
};
