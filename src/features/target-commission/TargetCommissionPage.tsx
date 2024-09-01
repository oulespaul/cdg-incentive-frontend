import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CloudDownload, Search } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/data-table/columns";
import { targetCommissionList } from "@/lib/data-test";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const TargetCommissionPage = () => {
    return (
        <div className="flex flex-col">
            <div className="flex text-start">
                <h1 className="text-2xl font-medium">นำเข้าเป้า commission (เป้าสาขา)</h1>
            </div>

            <div className="flex flex-col mt-2">
                <div className="flex">
                    <div className="flex w-1/2 gap-3">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="ปี" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="เดือน" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ก.ย.">ก.ย.</SelectItem>
                                <SelectItem value="ส.ค.">ส.ค.</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="สาขา" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ลาดพร้าว">ลาดพร้าว</SelectItem>
                                <SelectItem value="ชิดลม">ชิดลม</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex w-1/2 justify-end">
                        <Button className="bg-gradient-to-l from-cyan-500 to-blue-500"><CloudDownload className="mr-2 h-4 w-4" />นำเข้าเป้า commission</Button>
                    </div>
                </div>

                <div className="flex w-1/2 gap-2 mt-2">
                    <Input type="text" placeholder="Business Unit" />

                    <Input type="text" placeholder="Store Code" />
                </div>
            </div>

            <div className="flex mt-2 gap-2">
                <Button variant="outline" className="text-primary hover:text-primary"><Search className="mr-2 h-4 w-4" />ค้นหา</Button>
                <Button variant="ghost" className="text-primary hover:text-primary">ล้างตัวกรอง</Button>
            </div>

            <Separator className="my-4"/>

            <div className="text-start">
                <h1 className="text-lg font-medium mb-2">รายการข้อมูลเป้า commission (เป้าสาขา)</h1>
                <DataTable columns={columns} data={targetCommissionList} />
            </div>
        </div>
    );
};

export default TargetCommissionPage;
