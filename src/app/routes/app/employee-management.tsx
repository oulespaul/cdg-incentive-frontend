import { EmployeeList } from '@/features/employee-management/components/employee-list';

export const EmployeeManagementPage = () => {
    return (
        <div className="flex flex-col">
            <div className="flex text-start">
                <h1 className="text-2xl font-medium">จัดการข้อมูลพนักงานห้าง</h1>
            </div>

            <EmployeeList />
        </div>
    );
};
