--- PAGE 1 ---

 
 
Training System 
 
  Training System Requirement Specification   
SRS 
Version:  
TEMPLATE INFORMATION 
Project / Department 
 
Template Information 
 
 
Issued Date 
 
Issued Status 
 
Owner 
 
Location 
 
Confidential Class 
 
 
REVIEWER INFORMATION 
Role 
Required / Suggested 
Comment 
 
 
 
 
 
 
 
 
 
 
APPROVER INFORMATION 
Approver Name 
Role 
Date 
Revision 
Comment 
 
 
 
 
 
 
TEMPLATE REVISION HISTORY 
Revisio
n 
Date 
Description 
Revised by 
Reviewer 
Date 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
**Note: To know how to use this Template, refer to Guideline for Using Common Template for further information. 
[Please remove this page when template is applied] 
Confidential 


--- PAGE 2 ---

 
<TS> 
 
<Project abbreviation> - <Project code> 
 
 
 
 
 
Testing System Requirement 
Specification  
<Code> 
Version: <Version> 
 
 
 
Issued Status: 
<Draft / Approved> 
Issued Date: 
<mm-dd-yyyy> 
Owner: 
<Responsible Manager, who issues this document> 
Author: 
<Author> 
Location: 
<Project Repository> 
Confidential Class: 
<Secret / Confidential> 
 
 
 
 
 
 
Date: 
<mm-dd-yyyy> 
Approved by: 
<Name> 
Signature: 
 
​
Confidential​
TL Code: TL-RD-SRS 1.0 


--- PAGE 3 ---

 
<TS> 
 
 
 
​
Confidential​
TL Code: TL-RD-SRS 1.0 


--- PAGE 4 ---

 
Training System 
System Requirement Specification 
 
 
Table of Contents 
1.​
Introduction​
1 
1.1.​ Purpose​
1 
1.1.​ Scope​
1 
1.2.​ References​
1 
2.​
Overall Description​
1 
2.1​ Usecase diagram​
1 
2.1.1​
Actor Diagram Relationship​
1 
2.1.2​
UseCase for Unregistered User​
2 
2.1.3​
UseCase for User Member​
3 
2.1.4​
Use case for Admin​
4 
2.1.5​
Use case for System​
5 
2.1.6​
Use case for User Manager​
6 
2.1.6.1​
Quản lý Câu Hỏi và Đáp Án​
6 
2.1.6.2​
Quản lý Category of Question​
7 
2.1.6.3​
Quản lý Đề thi​
8 
2.1.6.4​
Quản lý Kỳ Thi​
8 
2.1​ State diagram​
9 
2.2​ Architectural System​
9 
2.3​ Component diagram​
9 
2.4.1.​ Class diagram​
9 
2.4.2.​ Dao diagram​
9 
2.4.3.​ Service diagram​
9 
3.​
Database Design​
9 
3.1.​ Entity Relationship Diagram​
9 
3.2.​ Schema​
9 
3.3.​ Detail schema​
10 
3.3.1.​ Table1​
10 
4.​
Functional Requirements​
10 
4.1.​ Unregistered User​
10 
4.1.1.​ Nhập mã code của kỳ thi​
10 
4.1.2.​ Xem chi tiết kỳ thi​
11 
4.1.3.​ Xem chi tiết bài thi​
14 
4.1.4.​ Thực hiện Test Bài thi​
16 
4.1.4.1.​ Nộp bài thi​
18 
4.2.​ Member​
20 
4.2.1.​ Login​
20 
4.2.2.​ Home Page​
22 
4.2.3.​ Logout​
24 
4.2.4.​ View profile​
25 
4.2.5.​ Xem danh sách kỳ thi đã tham gia​
26 
 
 
TL-RD-System Requirements Specification 1.0-EN.dot 
Confidential 
Page 1 
 


--- PAGE 5 ---

 
Training System 
System Requirement Specification 
 
 
4.2.5.1.​ Filter​
28 
4.2.5.2.​ Search​
29 
4.2.5.3.​ Sort​
30 
4.2.6.​ Chấm điểm phần tự luận cho kỳ thi​
31 
4.2.6.1.​ Xem danh sách các kỳ thi được Assign​
31 
4.2.6.1.1.​
Filter..............................................................................................................32 
4.2.6.1.2.​
Sort...............................................................................................................33 
4.2.6.1.3.​
Search.......................................................................................................... 34 
4.2.6.2.​ Xem chi tiết kỳ thi​
34 
4.2.6.2.1.​
Filter..............................................................................................................36 
4.2.6.2.2.​
Sort...............................................................................................................37 
4.2.6.3.​ Xem chi tiết bài thi​
38 
4.2.6.4.​ Chấm điểm​
39 
4.2.6.4.1.​
Submit điểm..................................................................................................41 
4.2.7.​ Xem thông báo​
42 
4.3.​ Admin​
42 
4.3.1.​ Quản lý Tài Khoản​
42 
4.3.1.1.​ Hiển thị danh sách tài khoản​
42 
4.3.1.1.1.​
Sort tài khoản............................................................................................... 42 
4.3.1.1.2.​
Search tài khoản...........................................................................................42 
4.3.1.1.3.​
Filter tài khoản..............................................................................................43 
4.3.2.​ View profile User​
43 
4.3.3.​ Quản lý nhóm Tài Khoản​
43 
4.3.3.1.​ View List nhóm tài khoản​
43 
4.3.3.1.1.​
Search nhóm tài khoản.................................................................................44 
4.3.3.1.2.​
Sort nhóm tài khoản..................................................................................... 44 
4.3.3.1.3.​
Filter nhóm tài khoản....................................................................................44 
4.3.3.2.​ Tạo nhóm tài khoản​
44 
4.3.3.3.​ Details nhóm tài khoản​
45 
4.3.3.4.​ Update nhóm tài khoản​
45 
4.3.3.4.1.​
Update tên nhóm tài khoản.......................................................................... 45 
4.3.3.4.2.​
Update Account trong nhóm tài khoản......................................................... 45 
4.3.3.5.​ Delete nhóm tài khoản​
45 
4.4.​ System​
46 
4.4.1.​ Chấm điểm trắc nghiệm​
46 
4.4.2.​ Quản lý thông báo​
46 
4.4.3.​ Lưu thông tin User​
47 
4.4.3.1.​ Lưu thông tin từ hệ thống User trả về​
47 
4.5.​ User Manager​
47 
4.5.1.​ Quản lý Câu hỏi -  Đáp án​
47 
4.5.1.1.​ View list Câu hỏi​
47 
4.5.1.1.1.​
Search câu hỏi..............................................................................................48 
4.5.1.1.2.​
Filter danh sách câu hỏi............................................................................... 48 
 
 
TL-RD-System Requirements Specification 1.0-EN.dot 
Confidential 
Page 2 
 


--- PAGE 6 ---

 
Training System 
System Requirement Specification 
 
 
4.5.1.1.3.​
Sort danh sách câu hỏi..............................................................................49 
4.5.1.2.​ Tạo Tag​
49 
4.5.1.3.​ Tạo câu hỏi​
49 
4.5.1.4.​ Import  danh sách câu hỏi​
50 
4.5.1.5.​ View chi tiết câu hỏi​
51 
4.5.1.6.​ Update câu hỏi​
52 
4.5.1.6.1.​
Update nhiều câu hỏi....................................................................................52 
4.5.1.6.2.​
Update từng câu hỏi.....................................................................................52 
4.5.1.7.​ Delete Question​
53 
4.5.2.​ Quản lý Category Câu hỏi​
53 
4.5.2.1.​ Tạo category câu hỏi​
54 
4.5.2.2.​ Update category câu hỏi​
54 
4.5.2.3.​ Delete category câu hỏi​
54 
4.5.3.​ Quản lý Đề thi​
54 
4.5.3.1.​ Tạo Đề thi​
54 
4.5.3.2.​ Hiển thị danh sách đề thi​
55 
4.5.3.2.1.​
Sort đề thi..................................................................................................... 55 
4.5.3.2.2.​
Search đề thi................................................................................................ 56 
4.5.3.2.3.​
Filter đề thi....................................................................................................56 
4.5.3.3.​ Details đề thi​
57 
4.5.3.4.​ Update Đề thi​
57 
4.5.3.4.1.​
Hiển thị danh sách câu hỏi add vào Đề thi...................................................58 
4.5.3.4.1.1.​
Search Câu hỏi add vào Đề thi.................................................................................. 58 
4.5.3.4.1.2.​
Filter Câu hỏi add vào Đề thi.................................................................................... 58 
4.5.3.4.1.3.​
Sort Câu hỏi add vào Đề thi...................................................................................... 59 
4.5.3.4.2.​
Thêm Câu hỏi vào Đề thi..............................................................................59 
4.5.3.4.3.​
Xóa câu hỏi trong Đề thi...............................................................................60 
4.5.3.5.​ Export đề thi​
60 
4.5.3.6.​ Import đề thi​
60 
4.5.3.7.​ Delete Đề thi​
60 
4.5.4.​ Quản lý Kỳ thi​
61 
4.5.4.1.​ Tạo Kỳ thi​
61 
4.5.4.1.1.​
Tạo Mới Kỳ Thi.............................................................................................61 
4.5.4.1.2.​
Clone Kỳ Thi.................................................................................................64 
4.5.4.2.​ View List Kỳ Thi​
66 
CHỨC NĂNG​
66 
MÔ TẢ YÊU CẦU​
66 
NGOẠI LỆ (Error Message)​
66 
CHỨC NĂNG LIÊN QUAN​
66 
VIEW LIST KỲ THI​
66 
- Sau khi chọn chức năng Quản Lý Kỳ Thi, hệ thống sẽ hiển thị ra màn hình view list kỳ thi. Dữ 
liệu của kỳ thi sẽ được trình bày dưới dạng bảng dữ liệu​
66 
SORT KỲ THI​
67 
- Từ những trường được hiển thị trong bảng dữ liệu view list, Manager có thể sắp xếp tăng 
dần, giảm dần, alphabel, ngày/tháng/theo các trường dữ liệu có trong bảng.​
67 
 
 
TL-RD-System Requirements Specification 1.0-EN.dot 
Confidential 
Page 3 
 


--- PAGE 7 ---

 
Training System 
System Requirement Specification 
 
 
- Từ những trường được hiển thị trong bảng dữ liệu view list, Manager có thể thực hiện filter 
kỳ thi theo các trường như tên kỳ thi, trạng thái, ngày bắt đầu, ngày kết thúc, người 
tạo, mã code kỳ thi​
67 
- Từ những trường được hiển thị trong bảng dữ liệu view list, Manager có thể thực hiện 
search kỳ thi theo tên kỳ thi, hoặc mã code của kỳ thi​
67 
4.5.4.3.​ View Detail Kỳ Thi​
68 
CHỨC NĂNG​
68 
MÔ TẢ YÊU CẦU​
68 
NGOẠI LỆ (Error Message)​
68 
CHỨC NĂNG LIÊN QUAN​
68 
[Sort Người Tham Gia]..................................................................................................................... 69 
[Report về kỳ thi]​
70 
4.5.4.3.1.​
Filter Người Tham Gia..................................................................................70 
4.5.4.3.2.​
Seach Người Tham Gia............................................................................... 70 
4.5.4.3.3.​
Sort Người Tham Gia...................................................................................70 
4.5.4.3.4.​
Filter Bài Thi................................................................................................. 70 
4.5.4.3.5.​
Sort Bài Thi...................................................................................................70 
4.5.4.3.6.​
Search Bài Thi..............................................................................................71 
4.5.4.3.7.​
Chi Tiết Bài Thi............................................................................................. 71 
4.5.4.4.​ Cập nhật Kỳ Thi​
75 
CHỨC NĂNG​
75 
MÔ TẢ YÊU CẦU​
75 
NGOẠI LỆ (Error Message)​
75 
CHỨC NĂNG LIÊN QUAN​
75 
[View Detail Kỳ Thi]​
75 
[View Detail Kỳ Thi]​
76 
[View Detail Kỳ Thi]​
76 
[View Detail Kỳ Thi]​
76 
[View Detail Kỳ Thi]​
76 
SCREEN DESIGN UPDATE THÔNG TIN KỲ THI.........................................................................76 
MÔ TẢ MÀN HÌNH........................................................................................................................ 76 
4.5.4.5.​ Xóa Kỳ thi​
78 
4.5.4.6.​ Chấm điểm tự luận​
78 
4.5.4.7.​ Report về kỳ thi​
78 
4.5.4.7.1.​
Xem report theo từng kỳ thi...................................................................... 78 
STT​
78 
Các trường hiển thị​
78 
Giải thích​
78 
1​
78 
Tên kỳ thi​
78 
Hiển thị thông tin kỳ thi​
78 
2​
78 
Người tạo kỳ thi​
78 
Người tạo ra kỳ thi​
78 
3​
78 
Người chấm thi​
78 
Người được chọn chấm thi​
78 
4​
79 
 
 
TL-RD-System Requirements Specification 1.0-EN.dot 
Confidential 
Page 4 
 


--- PAGE 8 ---

 
Training System 
System Requirement Specification 
 
 
Thời gian thi​
79 
Thời gian kỳ thi diễn ra( đầy đủ ngày tháng năm)​
79 
5​
79 
Tổng số đề thi​
79 
Tổng số câu hỏi trong đề thi​
79 
6​
79 
Tổng số câu hỏi​
79 
Tổng số câu hỏi có trong đề thi​
79 
7​
79 
Số câu khó​
79 
Tổng số câu hỏi khó​
79 
8​
79 
Số câu trung bình​
79 
Tổng số câu hỏi trung bình​
79 
9​
79 
Số câu dễ​
79 
Tổng số câu hỏi dễ​
79 
10​
79 
Tổng số thí sinh​
79 
Tổng số thí sinh​
79 
11​
79 
Bảng phân loại theo thang điểm​
79 
Sẽ phân theo các mức thang điểm điểm kém, điểm khá, điểm giỏi, tương ứng là số lượng thí 
sinh ứng với số điểm đó​
79 
12​
79 
Số người không tham gia​
79 
Số người không tham gia​
79 
13​
79 
Điểm trung bình​
79 
Điểm trung bình toàn kỳ thi​
79 
4.5.4.7.2.​
Xuất báo cáo theo từng kỳ thi...................................................................80 
5.​
Non-functional requirements​
81 
Usability​
81 
Reliability​
81 
Performance​
81 
Supportability​
81 
Design Constraints​
81 
On-line User Documentation and Help System Requirements​
81 
Purchased Components​
82 
Interfaces​
82 
User Interfaces​
82 
Hardware Interfaces​
82 
Software Interfaces​
82 
Communications Interfaces​
82 
Environment​
82 
Target Environment​
82 
Development Environment​
82 
Database​
82 
 
 
TL-RD-System Requirements Specification 1.0-EN.dot 
Confidential 
Page 5 
 


--- PAGE 9 ---

 
Training System 
System Requirement Specification 
 
 
Licensing Requirements​
82 
Legal, Copyright, and Other Notices​
82 
Applicable Standards​
82 
6.​
Appendix​
82 
7.​
Wiki​
83 
7.1.​ Message​
83 
7.2.​ Format input, display​
83 
7.2.1.​ Độ dài tối đa của 1 trường​
83 
7.2.2.​ Format Date​
83 
7.2.3.​ Format thời gian làm bài​
83 
7.2.4.​ Format điểm thi​
84 
7.2.5.​ Format thời gian thi còn lại​
84 
7.2.6.​ Format user name​
84 
7.2.7.​ Format Password​
84 
7.2.8.​ Format Mã code của kỳ thi​
84 
7.2.9.​ Email​
84 
7.2.10.​ Phone number​
84 
7.2.11.​ Identity card number​
84 
7.3.​ Technical​
85 
7.3.1.​ Paging​
85 
7.3.2.​ Search​
85 
 
 
 
 
 
TL-RD-System Requirements Specification 1.0-EN.dot 
Confidential 
Page 6 
 


--- PAGE 10 ---

 
Training System 
System Requirement Specification 
 
 
1.​ Introduction 
1.1.​
Purpose 
Tài liệu mô tả chi tiết các tác nhân và chức năng của hệ thống. Ngoài ra tài liệu còn các yêu 
cầu phi chức năng, các ràng buộc thiết kế và các yếu tố khác cần thiết để cung cấp mô tả 
đầy đủ và toàn diện về các yêu cầu cho phần mềm 
1.1.​
Scope 
Tài liệu mô tả hệ thống Training System của công ty, nhân viên và ứng viên có dự định ứng 
tuyển vào các vị trí trong công ty sẽ vào làm các bài test và được chấm điểm ở hệ thống 
1.2.​
References 
2.​ Overall Description  
2.1​
Usecase diagram 
2.1.1​ Actor Diagram Relationship 
​
​
Page 1 of 96 
 


--- PAGE 11 ---

 
Training System 
System Requirement Specification 
 
 
 
 
2.1.2​ UseCase for Unregistered User 
 
​
​
Page 2 of 96 
 


--- PAGE 12 ---

 
Training System 
System Requirement Specification 
 
 
 
2.1.3​ UseCase for User Member 
​
​
Page 3 of 96 
 


--- PAGE 13 ---

 
Training System 
System Requirement Specification 
 
 
 
2.1.4​ Use case for Admin 
 
​
​
Page 4 of 96 
 


--- PAGE 14 ---

 
Training System 
System Requirement Specification 
 
 
 
 
2.1.5​ Use case for System 
 
 
 
 
 
​
​
Page 5 of 96 
 


--- PAGE 15 ---

 
Training System 
System Requirement Specification 
 
 
 
 
 
 
 
 
​
 
2.1.6​ Use case for User Manager 
2.1.6.1​Quản lý Câu Hỏi và Đáp Án 
 
 
 
​
​
Page 6 of 96 
 


--- PAGE 16 ---

 
Training System 
System Requirement Specification 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
2.1.6.2​Quản lý Category of Question 
 
​
​
Page 7 of 96 
 


--- PAGE 17 ---

 
Training System 
System Requirement Specification 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
2.1.6.3​Quản lý Đề thi 
 
2.1.6.4​ Quản lý Kỳ Thi 
​
​
Page 8 of 96 
 


--- PAGE 18 ---

 
Training System 
System Requirement Specification 
 
 
 
2.1​
State diagram 
 
2.2​
Architectural System 
 
2.3​
Component diagram 
 
2.4.1.​ Class diagram 
 
2.4.2.​ Dao diagram 
 
2.4.3.​ Service diagram 
 
3.​ Database Design 
3.1.​
Entity Relationship Diagram 
3.2.​
Schema 
STT 
Name 
Description 
​
​
Page 9 of 96 
 


--- PAGE 19 ---

 
Training System 
System Requirement Specification 
 
 
 
 
 
3.3.​
Detail schema 
3.3.1.​ Table1 
Table1 
 
Field name 
Type 
Max Length 
Descrition 
 
 
 
 
 
4.​ Functional Requirements 
4.1.​
Unregistered User 
4.1.1.​ Nhập mã code của kỳ thi 
❖​ Actor: Unregistered User, Member, Manager, Admin (Sau đây sẽ gọi chung là User) 
❖​ Purpose: User nhập vào mã code của kỳ thi để làm bài test. 
❖​ Require: 
 ​ User sẽ phải có mã code của kỳ thi (mã code của kỳ thi do Manager cấp, mã code 
chỉ nhập được 1 lần) 
❖​ Flow 
 ​ Khi User vào hệ thống thì hệ thống sẽ hiển thị màn hình [Home Page]. 
 ​ Trên màn hình [Home Page], User sẽ nhập mã code vào ô input “Nhập mã code của 
kỳ thi” và click vào button “Test” 
o​
ô input “Nhập mã code của kỳ thi” chỉ nhập được tối đa 15 ký tự 
o​
Chỉ khi nhập đúng 15 ký tự thì button “Test” mới sáng lên và User mới có thể 
click vào được 
 ​ Sau đó hệ thống sẽ validate mã code của kỳ thi như sau: 
o​
Nếu validate không thành công thì hệ thống sẽ hiển thị lên message tương 
ứng, cụ thể như sau: 
Validate 
Mô tả 
Code Message 
Mã code không tồn tại 
hoặc không đúng định 
dạng (xem Format Mã 
code của kỳ thi) 
User nhập không đúng 
định dạng hoặc không 
đúng bất kì mã code nào 
trong database 
NDUY_01 
Mã code không còn hiệu 
lực  
User nhập mã code đã 
hết hạn (nghĩa là thời 
gian kết thúc của kỳ thi 
lớn hơn thời gian hiện 
tại) 
NDUY_02 
 
o​
Nếu validate thành công thì hệ thống sẽ chuyển trạng thái của mã code vừa 
nhập vào từ public 🡪 expired và thực thi usecase [Xem chi tiết kỳ thi] 
❖​ Other relevant functions: [Xem chi tiết kỳ thi]. 
❖​ Screen Design & Data Description 
​
​
Page 10 of 96 
 


--- PAGE 20 ---

 
Training System 
System Requirement Specification 
 
 
 
Hình 1: ​
Nhập mã code của kỳ thi 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.1.2.​ Xem chi tiết kỳ thi  
❖​ Actor: Unregistered User, Member, Manager, Admin (Sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể xem chi tiết thông tin của kỳ thi 
❖​ Require: 
 ​ Đối với Unregistered User: đã thực hiện thành công Usecase [Nhập mã code của kỳ 
thi] 
 ​ Đối với Member, Manager, Admin: đã thực hiện usecase [Xem danh sách kỳ thi đã 
tham gia] 
❖​ Flow: 
 ​ Tại màn hình này, hệ thống sẽ hiển thị thông tin chi tiết của kỳ thi và thông tin các 
bài thi của kỳ thi đó, cụ thể như sau: 
Tên trường hiển 
thị 
Mô tả 
Actor 
có 
thể 
nhìn thấy 
Format hiển thị 
Tên kỳ thi 
Tên của kỳ thi 
đang xem chi tiết 
User 
 
Ngày bắt đầu 
Ngày bắt đầu của 
kỳ thi 
Member, 
Manager, Admin 
[Format Date] 
Ngày kết thúc 
Ngày kết thúc của 
kỳ thi 
Member, 
Manager, Admin 
[Format Date] 
Trạng thái 
Member 
có 
thể 
nhìn 
thấy 
là: 
Publish, Done 
Manager, 
Admin 
có thể nhìn thấy là: 
Member, 
Manager, Admin 
Text 
​
​
Page 11 of 96 
 


--- PAGE 21 ---

 
Training System 
System Requirement Specification 
 
 
Draft, 
Publish, 
Done 
 
 
o​
Ngoài ra hệ thống còn hiển thị thông tin danh sách các bài thi của kỳ thi đó 
theo table (table này không có filter, search, sort, paging), cụ thể như sau: 
Tên trường hiển 
thị 
Mô tả 
Actor 
có 
thể 
nhìn thấy 
Format hiển thị 
Tên bài thi 
Tên bài thi 
User 
[Độ dài tối đa của 1 
trường] 
Chủ đề thi 
Thể loại của bài 
thi 
1 bài thi chỉ có 1 
thể loại 
VD: Sql 
User 
[Độ dài tối đa của 1 
trường] 
Thời gian làm bài 
Thời gian tối đa để 
làm bài thi 
Được quy đổi ra 
phút 
VD: 30p 
User 
[Format 
thời gian 
làm bài] 
Điểm thi 
Điểm của bài thi 
Điểm có giá trị >= 
0 và <= 10 
Member, 
Manager, Admin 
[Format điểm thi] 
[Action] 
Nếu bài thi đã 
hoàn thành thì sẽ 
hiển thị button 
 
Nếu bài thi chưa 
hoàn 
thành 
thì 
hiển 
thị 
button 
“Test” 
User 
Image / Button 
 
 ​ Ngoài ra, khi User click vào button “Test” thì hệ thống sẽ hiển thị form xác nhận có 
có vào thi test không, cụ thể như sau: 
Code Message 
Sự kiện xảy ra khi click 
vào button “Có” 
Sự kiện xảy ra khi click 
vào button  “Không” 
NDUY_03 
Sẽ 
bắt 
đầu 
Usecase 
[Xem chi tiết bài thi] 
Ẩn form xác nhận đi 
 
❖​ Other relevant functions: [Nhập mã code của kỳ thi], [Xem chi tiết bài thi] 
❖​ Screen Design & Data Description 
​
​
Page 12 of 96 
 


--- PAGE 22 ---

 
Training System 
System Requirement Specification 
 
 
 
Hình 2: ​
Thông tin chi tiết kỳ thi của Unregistered User 
 
Hình 3: ​
Thông tin chi tiết kỳ thi của Member 
​
​
Page 13 of 96 
 


--- PAGE 23 ---

 
Training System 
System Requirement Specification 
 
 
 
Hình 4: ​
Xác nhận thi Test 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.1.3.​ Xem chi tiết bài thi 
❖​ Actor: Unregistered User, Member, Manager, Admin (Sau đây sẽ gọi chung là User) 
❖​ Purpose: User xem thông tin chi tiết của bài thi  
❖​ Require: 
 ​ User đã thực hiện Usecase [Xem chi tiết kỳ thi] và click vào button “Test” trên màn 
hình [Xem chi tiết kỳ thi] 
❖​ Flow: 
 ​ Ở usecase này, hệ thống sẽ hiển thị thông tin chi tiết của bài thi 
 ​ Thông tin chi tiết của bài thi bao gồm: 
Tên trường hiển 
thị 
Mô tả 
Actor 
có 
thể 
nhìn thấy 
Format hiển thị 
Tên bài thi 
Tên bài thi đang 
thi 
User 
 
Chủ đề thi 
Thể loại của bài 
thi 
1 bài thi chỉ có 1 
thể loại 
VD: Sql 
User 
 
Tổng số câu hỏi 
Tổng số câu hỏi 
của bài thi: tự luận 
+ trắc nhiệm 
User 
Integer >= 0 
​
​
Page 14 of 96 
 


--- PAGE 24 ---

 
Training System 
System Requirement Specification 
 
 
Số câu hỏi trắc 
nhiệm 
Số câu hỏi trắc 
nhiệm có trong bài 
thi 
User 
Integer >= 0 
Số câu hỏi tự luận 
Số câu hỏi tự luận 
có trong bài thi 
User 
Integer >= 0 
Tổng 
điểm 
trắc 
nhiệm 
Tổng điểm của tất 
cả các câu hỏi trắc 
nhiệm của bài thi 
User 
[Format điểm thi] 
Tổng điểm tự luận 
Tổng điểm của tất 
cả các câu hỏi tự 
luận của bài thi 
User 
[Format điểm thi] 
Thời gian làm bài 
Thời gian tối đa để 
làm bài thi 
Được quy đổi ra 
phút 
VD: 30p 
User 
[Format 
thời 
gian 
làm bài] 
 
 ​ Ngoài ra, khi User xem xong thông tin chi tiết của bài thi thì User có thể click vào 
button “Bắt đầu” để bắt đầu làm bài thi (xem usecase [Thực hiện Test Bài thi]) 
❖​ Other relevant functions: [Thực hiện Test Bài thi] 
❖​ Screen Design & Data Description 
 
Hình 5: ​
Thông tin chi tiết của bài thi 
​
​
Page 15 of 96 
 


--- PAGE 25 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.1.4.​ Thực hiện Test Bài thi 
❖​ Actor: Unregistered User, Member, Manager, Admin (Sau đây sẽ gọi chung là User) 
❖​ Purpose: User thực hiện test bài thi  
❖​ Require: 
 ​ User đã thực thi xong usecase [Xem chi tiết bài thi] 
❖​ Flow: 
 ​ Mỗi trang sẽ hiển thị 1 câu hỏi và user có thể trả lời câu hỏi đó ngay trên màn hình 
này 
o​
Tất cả các câu trắc nhiệm sẽ ở trước các câu hỏi tự luận  
 ​ Tại mỗi trang User có thể xem câu hỏi và trả lời câu hỏi 
Action 
Câu hỏi trắc nhiệm 
Câu hỏi tự luận 
Xem câu hỏi 
User có thể xem được: 
●​ Nội dung câu hỏi 
●​ Các đáp án có thể 
trả lời của câu hỏi 
đó 
User chỉ xem được: 
●​ Nội dung câu hỏi 
 
Trả lời câu hỏi 
User sẽ trả lời bằng cách 
tích vào checkbox ở bên 
cạnh câu trả lời 
User sẽ trả lời bằng cách 
viết nội dung câu trả lời 
theo area text của câu trả 
lời đó 
 
 ​ User có thể next câu hỏi tiếp theo, cụ thể như sau: 
o​
Nếu chưa phải câu hỏi cuối cùng của bài thi thì button “Next” sẽ hiện lên  
o​
Khi User click vào button “Next” thì hệ thống sẽ hiển thị câu hỏi tiếp theo 
 
 ​ User cũng có thể quay lại câu hỏi trước, cụ thể như sau: 
o​
Bắt đầu từ câu hỏi thứ 2 của bài thi thì button “Prev” sẽ hiện lên  
o​
Khi User click vào button “Prev” thì hệ thống sẽ hiển thị câu hỏi trước đó 
 
 ​ User có thể chỉnh sửa lại câu trả lời bằng cách quay lại quay hỏi cần sửa, sau đó sẽ 
thực hiện chỉnh sửa câu trả lời cho câu hỏi đó 
 
 ​ Ngoài ra trên màn hình này User có thể xem thời gian còn lại của bài thi 
o​
Thời gian thi còn lại sẽ được hiển thị theo format [Format thời gian thi còn lại] 
o​
Ngoài ra nếu vào các mốc thời gian đặc biệt thì thời gian còn lại được hiển 
thị với color màu đỏ và sẽ hiện thông báo dưới thời gian còn lại 
Mốc thời gian 
Code Message 
User đã làm bài được ½ thời gian 
NDUY_04 
Thời gian còn 5 phút 
NDUY_05 
​
​
Page 16 of 96 
 


--- PAGE 26 ---

 
Training System 
System Requirement Specification 
 
 
Thời gian còn 2 phút 
NDUY_06 
 
 ​ Khi hết thời gian làm bài hoặc làm bài xong thì User có thể nộp bài thi (xem usecase 
[Nộp bài thi]) 
❖​ Other relevant functions: [Xem chi tiết bài thi], [Nộp bài thi] 
❖​ Screen Design & Data Description 
 
Hình 6: ​
Câu hỏi trắc nhiệm 
 
​
​
Page 17 of 96 
 


--- PAGE 27 ---

 
Training System 
System Requirement Specification 
 
 
Hình 7: ​
Câu hỏi tự luận 
 
Hình 8: ​
User đã làm bài được ½ thời gian 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.1.4.1.​
Nộp bài thi  
❖​ Actor: Unregistered User, Member, Manager, Admin (Sau đây sẽ gọi chung là User) 
❖​ Purpose: User nộp bài thi hoặc hết thời gian thì hệ thống sẽ tự động nộp bài thi 
❖​ Require: 
 ​ User đang ở trong màn hình [Thực hiện Test Bài thi] 
 ​ Usecase này xảy ra khi  
o​
User muốn nộp bài thi (không nhất thiết phải làm hết tất cả bài thi mới được 
nộp bài)  
o​
Hoặc hết thời gian làm bài thi (hệ thống sẽ tự động thực thi usecase này) 
❖​ Flow: 
 ​ Khi User muốn nộp bài thi thì sẽ click vào button “Nộp bài”, hệ thống sẽ hiển thị lên 
form xác nhận nộp bài thi cụ thể như sau: 
Code Message 
Sự kiện xảy ra khi click 
vào button “Có” 
Sự kiện xảy ra khi click 
vào button  “Không” 
NDUY_07 
Hệ thống sẽ lưu lại kết 
quả làm bài và chuyển 
Tắt form xác nhân đi và 
tiếp tục làm bài 
​
​
Page 18 of 96 
 


--- PAGE 28 ---

 
Training System 
System Requirement Specification 
 
 
màn hình về màn hình 
[Xem chi tiết kỳ thi] 
 
 ​ Khi hết thời gian làm bài thi thì hệ thống sẽ tự động thực thi use case này như sau: 
o​
Hệ thống sẽ lưu lại kết quả làm bài 
o​
Sau đó, hệ thống sẽ hiển thị form thông báo có nội dung message NDUY_08 
và button “Đồng ý”. 
o​
User click vào button “Đồng ý” thì hệ thống sẽ chuyển về màn hình [Xem chi 
tiết kỳ thi] 
❖​ Other relevant functions: [Xem chi tiết kỳ thi] 
❖​ Screen Design & Data Description 
 
Hình 9: ​
Form xác nhận nộp bài 
​
​
Page 19 of 96 
 


--- PAGE 29 ---

 
Training System 
System Requirement Specification 
 
 
 
Hình 10: ​
Form thông báo hết thời gian làm bài 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.​
Member  
4.2.1.​ Login 
❖​ Actor: Member, Manager, Admin (Sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể đăng nhập vào hệ thống. 
❖​ Require: 
 ​ User phải có Account trong hệ thống AMS (Account Management System). 
❖​ Flow 
 ​ Khi User vào hệ thống thì hệ thống sẽ hiển thị màn hình [Home Page]. 
 ​ User sẽ click vào button [Đăng nhập] để chuyển sang màn hình [Form đăng nhập] 
 ​ Hệ thống hiển thị [Form đăng nhập] bao gồm các thông tin: 
o​
*User name 
▪​
ô input [User name] chỉ nhập được từ 1 ký tự 🡪 15 ký tự 
o​
*Password 
▪​
ô input [Password] chỉ nhập được từ 1 ký tự 🡪 25 ký tự và các ký tự 
nhập vào đểu được mã hóa thành ký tự * 
Chú ý: User name & Password phân biệt chữ hoa chữ thường, dấu 
 ​ Sau khi nhập sau, User sẽ click vào button [Đăng nhập] hệ thống sẽ validate thông 
tin User name và Password như sau: 
o​
Nếu validate không thành công thì hệ thống sẽ hiển thị lên message cụ thể 
như sau: 
​
​
Page 20 of 96 
 


--- PAGE 30 ---

 
Training System 
System Requirement Specification 
 
 
Validate 
Mô tả 
Code Message 
User name trống hoặc 
user name > 15 ký tự 
User không nhập vào ô 
input [User name] hoặc 
nhập vào ô input [User 
name] > 15 ký tự 
NDUY_09 
Password 
trống 
hoặc 
password > 25 ký tự 
User không nhập vào ô 
input [Password] hoặc 
nhập 
vào 
ô 
input 
[Password] > 25 ký tự 
NDUY_10 
 
o​
Nếu validate thành công thì hệ thống sẽ tiếp tục gửi thông tin sang hệ thống 
AMS để xác thực 
▪​
Nếu User name và Password không đúng thì hệ thống sẽ hiển thị 
message NDUY_11 và hệ thống sẽ giữa lại Username và reset 
password trên màn hình thành rỗng 
▪​
Nếu User name và Password đúng thì hệ thống sẽ chuyển sang màn 
hình [Home Page] với trạng thái là đã login và có Role là Role của 
User name nhập vào 
o​
Ngoài ra trên màn hình này còn có checkbox “Remember me”, nếu User 
select checkbox này thì Brower sẽ lưu lại User name và Password trên 
brower 
❖​ Other relevant functions: [Home Page]. 
❖​ Screen Design & Data Description 
 
Hình 11: ​
Màn hình Home Page khi chưa đăng nhập 
​
​
Page 21 of 96 
 


--- PAGE 31 ---

 
Training System 
System Requirement Specification 
 
 
 
Hình 12: ​
Form login 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.2.​ Home Page 
❖​ Actor: Unregistered User, Member, Manager, Admin (sau đây sẽ gọi chung là User) 
❖​ Purpose: Trang chính của hệ thống. 
❖​ Require 
N/A 
❖​ Flow 
 ​ Trang [Home Page] sẽ hiển thị các thông tin tùy theo Role của User, cụ thể như sau 
Giao diện 
Actor 
Các chức năng, 
thông tin có thể 
nhìn thấy 
Mô tả 
​
​
Page 22 of 96 
 


--- PAGE 32 ---

 
Training System 
System Requirement Specification 
 
 
[Trang 
Home 
khi chưa đăng 
nhập] 
Unregistere
d User 
[Nhập mã code của 
kỳ thi] 
Giữa màn hình [home page], Unregistered 
User nhìn thấy ô input [Nhập mã code của kỳ 
thi] và button “Test” 
Thông tin khác 
Ngoài ra Unregistered User còn nhìn thấy logo 
(khi click vào logo thì hệ thống sẽ chuyển về 
màn hình [Home Page]), và button “Đăng nhập” 
[Trang 
Home 
khi đăng nhập 
với 
Role 
là 
Member] 
Member 
Có tất cả các chức 
năng 
của 
Unregistered User 
Xem mô tả ở Actor Unregistered User 
Thông 
tin 
của 
mình 
khi 
đăng 
nhập xong 
Trên header, Member sau khi đăng nhập thì 
button “Đăng nhập” sẽ bị thay thế bằng avatar 
default của Member, tên của Member và 
button 
 (xem usecase [Logout] sẽ mô tả chi 
tiết về button này) 
[Logout] 
Trên header, Member có thể click vào button 
 để logout 
[Xem danh sách kỳ 
thi đã tham gia] 
Trên header, Member nhìn thấy logo của chức 
năng và button “Kỳ thi” 
[Chấm điểm phần tự 
luận cho kỳ thi] 
Trên header, Member nhìn thấy logo của chức 
năng và button “Chấm điểm” 
 
 
[Xem thông báo] 
Trên header, Member nhìn thấy button có hình 
chuông 
[Trang 
Home 
khi đăng nhập 
với 
Role 
là 
Manager] 
Manager 
Có tất cả các chức 
năng của Member 
Xem mô tả ở Actor Member 
[Quản lý kỳ thi] 
Trên menu ở bên trái của brower, Manager 
nhìn thấy logo của chức năng và button “Quản 
lý kỳ thi” 
[Quản lý đề thi] 
Trên menu ở bên trái của brower, Manager 
nhìn thấy logo của chức năng và button “Quản 
lý đề thi” 
[Quản lý câu hỏi] 
Trên menu ở bên trái của brower, Manager 
nhìn thấy logo của chức năng và button “Quản 
lý câu hỏi” 
[Quản 
lý 
Danh 
mục câu hỏi] 
Trên menu ở bên trái của brower, Manager 
nhìn thấy logo của chức năng và button “Quản 
lý Danh mục câu hỏi” 
[Báo cáo] 
Trên menu ở bên trái của brower, Manager 
nhìn thấy logo của chức năng và button “Báo 
cáo” 
​
​
Page 23 of 96 
 


--- PAGE 33 ---

 
Training System 
System Requirement Specification 
 
 
[Trang 
Home 
khi đăng nhập 
với 
Role 
là 
Admin] 
Admin 
Có tất cả các chức 
năng của Manager 
Xem mô tả ở Actor Manager 
[Quản lý tài khoản] 
Trên menu ở bên trái của brower, Manager 
nhìn thấy logo của chức năng và button “Quản 
lý tài khoản” 
 
❖​ Other relevant functions: [Home Page]. 
❖​ Screen Design & Data Description 
 
Hình 13: ​
Trang Home khi chưa đăng nhập 
 
Hình 14: ​
Trang Home khi đăng nhập với Role là Member 
​
​
Page 24 of 96 
 


--- PAGE 34 ---

 
Training System 
System Requirement Specification 
 
 
  
Hình 15: ​
Trang Home khi đăng nhập với Role là Manager 
 
Hình 16: ​
Trang Home khi đăng nhập với Role là Admin 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.3.​ Logout 
❖​ Actor: Member, Manager, Admin (sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể đăng xuất khỏi hệ thống. 
❖​ Require: 
 ​ User đã đăng nhập vào trong hệ thống (xem usecase [Login]). 
 ​ Tại bất kì màn hình nào (ngoại trừ màn hình [Thực hiện Test Bài thi]) thì User cũng có 
thể thực hiện usecase này 
​
​
Page 25 of 96 
 


--- PAGE 35 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Flow 
 ​ User click vào button 
 ở cạnh Tên của User (nằm ở góc phải của brower)  
 ​ Sau đó hệ thống sẽ xổ xuống submenu, trong submenu có button “Đăng xuất” 
 ​ Khi User click vào button “Đăng xuất” thì hệ thống sẽ đăng xuất tài khoản của User 
và chuyển về màn hình [Home Page] khi chưa đăng nhập 
❖​ Other relevant functions: [Home Page], [Login]. 
❖​ Screen Design & Data Description 
 
Hình 17: ​
Form logout 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.4.​ View profile 
❖​ Actor: Member, Manager, Admin (sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể xem được profile của mình hoặc xem profile của người khác đối 
với quyền Admin 
❖​ Require 
 ​ Sau khi User đăng nhập thành công (xem usecase [Login]) thì hệ thống sẽ hiển thị 
màn hình [Home Page]. 
 ​ Tại màn hình [Home Page], User click vào label hiển thị “Họ và Tên” của user đăng 
nhập hệ thống để vào được usecase này  
❖​ Flow: 
 ​ Tại màn hình này, hệ thống sẽ hiển thị thông tin cơ bản profile của riêng User, cụ thể 
như sau: 
Tên trường hiển 
thị 
Mô tả 
Actor 
có 
thể 
nhìn thấy 
Format hiển thị 
Họ và tên 
Họ và tên của 
User đang đăng 
nhập 
trên 
hệ 
thống hoặc họ và 
tên của một User 
User 
Text 
​
​
Page 26 of 96 
 


--- PAGE 36 ---

 
Training System 
System Requirement Specification 
 
 
mà Admin đang 
xem profile 
Tên đăng nhập 
Tên 
đăng 
nhập 
của 
User 
đang 
đăng nhập trên hệ 
thống hoặc họ và 
tên của một User 
mà Admin đang 
xem profile 
User 
Text 
Phòng ban 
Phòng 
ban 
của 
User đang đăng 
nhập 
trên 
hệ 
thống hoặc họ và 
tên của một User 
mà Admin đang 
xem profile 
User 
Text 
Vị trí làm việc 
Vị trí làm việc của 
User đang đăng 
nhập 
trên 
hệ 
thống hoặc họ và 
tên của một User 
mà Admin đang 
xem profile 
User 
Text 
 
❖​ Other relevant functions:  
❖​ Screen Design & Data Description 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.5.​ Xem danh sách kỳ thi đã tham gia 
❖​ Actor: Member, Manager, Admin (sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể xem được các kỳ thi của mình  
❖​ Require 
 ​ Sau khi User đăng nhập thành công (xem usecase [Login]) thì hệ thống sẽ hiển thị 
màn hình [Home Page]. 
 ​ Tại màn hình [Home Page], User click vào button “Kỳ thi” để vào được usecase này  
❖​ Flow: 
 ​ Tại màn hình này, hệ thống sẽ hiển thị thông tin cơ bản kỳ thi của riêng User, cụ thể 
như sau: 
Tên trường hiển 
thị 
Mô tả 
Actor 
có 
thể 
nhìn thấy 
Format hiển thị 
​
​
Page 27 of 96 
 


--- PAGE 37 ---

 
Training System 
System Requirement Specification 
 
 
Tên kỳ thi 
Tên của kỳ thi 
User 
[Độ dài tối đa của 1 
trường] 
Ngày bắt đầu 
Ngày bắt đầu của 
kỳ thi 
User 
[Format Date] 
Ngày kết thúc 
Ngày kết thúc của 
kỳ thi 
User 
[Format Date] 
Trạng thái 
Trạng thái hiện tại 
của kỳ thi 
Có 2 trạng thái mà 
User có thể nhìn 
thấy là: Publish, 
Done 
User 
Text 
 
 ​ Danh sách kỳ thi sẽ được phân trang, cụ thể như mục [Paging] 
 ​ Mặc định thì danh sách kỳ thi sẽ được  
o​
filter với label [trạng thái] = publish (xem usecase [Filter]) 
o​
sort theo ngày bắt đầu, giảm dần (xem usecase [Sort]) 
o​
không thực hiện search (xem usecase [Search]) 
 ​ User có thể thực hiện đồng thời các usecase sau: 
o​
Search (xem usecase [Search]) 
o​
Sort (xem usecase [Sort]) 
o​
Filter (xem usecase [Filter]) 
 ​ Ngoài ra, khi User click vào bất kì kỳ thi nào thì sẽ bắt đầu Usecase [Xem chi tiết kỳ 
thi] 
❖​ Other relevant functions: [Paging], [Search], [Sort], [Filter], [Xem chi tiết kỳ thi] 
❖​ Screen Design & Data Description 
 
​
​
Page 28 of 96 
 


--- PAGE 38 ---

 
Training System 
System Requirement Specification 
 
 
Hình 18: ​
Danh sách kỳ thi của Member 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.5.1.​
Filter 
❖​ Actor: Member, Manager, Admin (sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể lọc danh sách các kỳ thi của mình  theo nhiều tiêu chí chọn  
❖​ Require 
 ​ User đang ở trong màn hình [Xem danh sách kỳ thi đã tham gia]  
❖​ Flow: 
 ​ Tại màn hình [Xem danh sách kỳ thi đã tham gia], User click vào button có biểu tượng 
filter  
o​
Nếu chưa hiển thị các điều kiện filter thì sẽ hiển thị các điều kiện đó ra  
o​
Nếu đã hiển thị các điều kiện filter thì sẽ ẩn các điều kiện đó đi 
 ​ Sau đó User có thể click vào các combo box filter để lựa chọn điều kiện lọc, cụ thể 
như sau: 
Tên Filter 
Các 
lựa 
chọn 
Mô tả 
Selecte
d 
Default 
Format 
Ngày bắt 
đầu 
From 
Ngày bắt đầu lọc cho field 
[Ngày bắt đầu] 
User 
có 
thể 
không nhập 
trường này 
null 
Date 
picker 
To 
Ngày kết thúc lọc cho field 
[Ngày bắt đầu] 
User 
có 
thể 
không nhập 
trường này 
Ngày 
kết 
thúc 
From 
Ngày bắt đầu lọc cho field 
[Ngày kết thúc] 
User 
có 
thể 
không nhập 
trường này 
null 
Date 
picker 
To 
Ngày kết thúc lọc cho field 
[Ngày kết thúc] 
User 
có 
thể 
không nhập 
trường này 
Trạng thái 
Publish 
Lọc kỳ thi có trạng thái là đang 
thi 
Default 
là 
Publish 
Combo 
box 
 
Done 
Lọc kỳ thi có trạng thái là đã 
xong 
​
​
Page 29 of 96 
 


--- PAGE 39 ---

 
Training System 
System Requirement Specification 
 
 
 
All 
Lấy tất cả các trạng thái của kỳ 
thi  
 
Note: Có thể kết hợp các Filter lại với nhau 
 ​ Sau đó hệ thống sẽ validate thời gian User nhập vào như sau: 
o​
Nếu validate không thành công thì hệ thống sẽ hiển thị lên message cụ thể 
như sau: 
Validate 
Mô tả 
Code Message 
Trong label [Ngày bắt đầu 
] User nhập ngày “From” 
> “To” 
User nhập ngày “From” > 
“To” 
NDUY_12 
Trong label [Ngày kết 
thúc ] User nhập ngày 
“From” > “To” 
User nhập ngày “From” > 
“To” 
NDUY_02 
 
o​
Nếu validate thành công thì hệ thống sẽ hiển thị danh sách kỳ thi được lọc 
theo các điều kiện được chọn. 
 ​ Ngoài ra, User có thể kết hợp filter với  
o​
Search(xem usecase [Search])  
o​
Sort(xem usecase [Sort]) 
❖​ Other relevant functions: [Xem danh sách kỳ thi đã tham gia], [Sort], [Search] 
❖​ Screen Design & Data Description 
 
Hình 19: ​
Validate Filter 
​
​
Page 30 of 96 
 


--- PAGE 40 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.5.2.​
Search 
❖​ Actor: Member, Manager, Admin (sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể tìm kiếm danh sách các kỳ thi của mình theo tên của kỳ thi  
❖​ Require 
 ​ User đang ở trong màn hình [Xem danh sách kỳ thi đã tham gia]  
❖​ Flow: 
 ​ Tại màn hình [Xem danh sách kỳ thi đã tham gia], User nhập keyword vào ô input [Tìm 
kiếm], sau đó User bấm Enter hoặc click vào button có biểu tượng tìm kiếm 
o​
ô input [Tìm kiếm] chỉ nhập được tối đa 200 ký tự 
 ​ Sau đó, hệ thống sẽ hiển thị danh sách kỳ thi có trường [tên kỳ thi] ứng với keyword 
nhập vào 
o​
Cách search sẽ được định nghĩa như trong mục [Search] 
 ​ Mặc định khi User không chọn thì sẽ không search theo keyword nào cả 
 ​ Ngoài ra, User có thể kết hợp search với  
o​
Filter(xem usecase [Filter])  
o​
Sort(xem usecase [Sort]) 
❖​ Other relevant functions: [Xem danh sách kỳ thi đã tham gia], [Sort], [Filter] 
❖​ Screen Design & Data Description 
N/A 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.5.3.​
Sort 
❖​ Actor: Member, Manager, Admin (sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể sắp xếp danh sách các kỳ thi của mình theo tiêu chí nào đó  
❖​ Require: 
 ​ User đang ở trong màn hình [Xem danh sách kỳ thi đã tham gia]  
❖​ Flow: 
 ​ Tại màn hình [Xem danh sách kỳ thi đã tham gia], User có thể click vào tên các colume 
để sắp xếp  
 ​ Các column được sắp xếp là: Tên kỳ thi, Ngày bắt đầu, Ngày kết thúc, Trạng thái.  
 ​ Sau đó, hệ thống sẽ hiển thị danh sách kỳ thi đã được sắp xếp theo column được 
click 
 ​ Chỉ sort được theo 1 trường 
 ​ Mặc định khi User không chọn thì sẽ sort theo ngày bắt đầu, giảm dần 
 ​ Ngoài ra, User có thể kết hợp sort với  
o​
Filter(xem usecase [Filter])  
o​
Search(xem usecase [Search]) 
​
​
Page 31 of 96 
 


--- PAGE 41 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Other relevant functions: [Xem danh sách kỳ thi đã tham gia], [Filter], [Search] 
❖​ Screen Design & Data Description 
N/A 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.6.​ Chấm điểm phần tự luận cho kỳ thi 
4.2.6.1.​
Xem danh sách các kỳ thi được Assign 
❖​ Actor: Member, Manager, Admin được assign (sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể xem danh sách các kì thi được assign chấm điểm 
❖​ Request 
 ​ Sau khi User đăng nhập thành công (xem usecase [Login]) thì hệ thống sẽ hiển thị 
màn hình [Home Page]. 
 ​ Tại màn hình [Home Page], trên thanh header, User click vào button “Chấm điểm” để 
vào được usecase này  
❖​ Flow: 
 ​ Tại màn hình này, hệ thống sẽ hiển thị danh sách các kì thi ở trạng thái done và các 
thông tin cơ bản của kỳ thi, cụ thể như sau: 
Tên trường hiển thị 
Mô tả 
Format hiển thị 
Tên kỳ thi 
Tên của kỳ thi 
[Độ dài tối đa của 1 
trường] 
Người assign chấm điểm 
User name của người được 
assign chấm điểm 
Text 
Trạng thái 
Trạng thái chấm điểm của kì thi: 
+ Chưa chấm xong 
+ Đã chấm  
Text 
 
 ​ Danh sách kỳ thi sẽ được phân trang, cụ thể như mục [Paging] 
 ​ Mặc định thì danh sách kỳ thi sẽ được  
o​
filter với label [trạng thái] = “Chưa chấm xong" (xem usecase [Filter]) 
 ​ User có thể thực hiện đồng thời các usecase sau: 
o​
Search (xem usecase [Search]) 
o​
Filter (xem usecase [Filter])  
o​
Sort(xem usecase [Sort]) 
 ​ Ngoài ra, khi User click vào bất kì kỳ thi nào thì sẽ bắt đầu Usecase [Xem chi tiết kỳ 
thi] 
❖​ Other relevant functions: [Paging], [Sort], [Search], [Filter] 
❖​ Screen Design & Data Description 
​
​
Page 32 of 96 
 


--- PAGE 42 ---

 
Training System 
System Requirement Specification 
 
 
 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.6.1.1.​
Filter 
❖​ Actor: Member, Manager, Admin (sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể lọc danh sách các kỳ thi được assign theo nhiều tiêu chí chọn  
❖​ Request 
 ​ User đang ở trong màn hình [Xem danh sách các kì thi được assign]  
❖​ Flow: 
 ​ Tại màn hình [Xem danh sách các kì thi được assign], User click vào button có biểu 
tượng filter  
o​
Nếu chưa hiển thị các điều kiện filter thì sẽ hiển thị các điều kiện đó ra  
o​
Nếu đã hiển thị các điều kiện filter thì sẽ ẩn các điều kiện đó đi 
 ​ Sau đó User có thể click vào các combo box để lựa chọn điều kiện lọc, cụ thể như 
sau: 
Tên Filter 
Các 
lựa 
chọn 
Mô tả 
Selecte
d 
Default 
Format 
Trạng thái 
Chưa 
chấm 
xong 
Lọc kỳ thi có trạng thái là 
“Chưa chấm xong” 
Chưa 
chấm 
xong 
Combo 
box 
Đã chấm 
Lọc kỳ thi có trạng thái là 
“Đã chấm” 
​
​
Page 33 of 96 
 


--- PAGE 43 ---

 
Training System 
System Requirement Specification 
 
 
All 
Lấy tất cả các trạng thái 
của kỳ thi  
Người 
Assign 
Tên user 
Lọc các kì thì được assign 
từ tên user được nhập vào 
Null 
Checkbox 
Có 
thể 
search 
Note: Có thể kết hợp các Filter lại với nhau 
 ​ Ngoài ra, User có thể kết hợp filter với  
o​
Search(xem usecase [Search])  
o​
Sort(xem usecase [Sort]) 
❖​ Other relevant functions: [Xem danh sách các kì thi được assign], [Sort], [Search] 
❖​ Screen Design & Data Description 
 
Hình 20: ​
Validate Filter 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.6.1.2.​
Sort 
❖​ Actor: Member, Manager, Admin (sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể sắp xếp danh sách các kỳ thi của mình theo tiêu chí nào đó  
❖​ Request: 
 ​ User đang ở trong màn hình [Xem danh sách các kì thi được assign]  
❖​ Flow: 
​
​
Page 34 of 96 
 


--- PAGE 44 ---

 
Training System 
System Requirement Specification 
 
 
 ​ Tại màn hình [Xem danh sách các kì thi được assign] User có thể click vào tên các 
column để sắp xếp  
 ​ Các column được sắp xếp là: Tên kỳ thi, Người assign, Trạng thái.  
 ​ Sau đó, hệ thống sẽ hiển thị danh sách kỳ thi đã được sắp xếp theo column được 
click 
 ​ Chỉ sort được theo 1 trường 
 ​ Mặc định khi User không chọn thì sẽ không sort theo trường nào cả 
 ​ Ngoài ra, User có thể kết hợp sort với  
o​
Filter(xem usecase [Filter])  
o​
Search(xem usecase [Search]) 
❖​ Other relevant functions: [Xem danh sách các kì thi được assign], [Filter], [Search] 
❖​ Screen Design & Data Description 
N/A 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.6.1.3.​
Search 
❖​ Actor: Member, Manager, Admin (sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể tìm kiếm danh sách các kỳ thi theo tên của kỳ thi 
❖​ Request 
 ​ User đang ở trong màn hình [Xem danh sách các kì thi được assign]  
❖​ Flow: 
 ​ Tại màn hình [Xem danh sách các kì thi được assign], User nhập keyword vào ô input 
[Tìm kiếm], sau đó User bấm Enter hoặc click vào button có biểu tượng tìm kiếm 
o​
ô input [Tìm kiếm] chỉ nhập được tối đa 200 ký tự 
 ​ Sau đó, hệ thống sẽ hiển thị danh sách kỳ thi có trường [Tên kì thi] ứng với keyword 
nhập vào 
o​
Cách search sẽ được định nghĩa như trong mục [Search] 
 ​ Mặc định khi User không chọn thì sẽ không search theo keyword nào cả 
 ​ Ngoài ra, User có thể kết hợp search với  
o​
Filter(xem usecase [Filter])  
o​
Sort(xem usecase [Sort]) 
❖​ Other relevant functions: [Xem danh sách các kì thi được assign], [Sort], [Filter] 
❖​ Screen Design & Data Description 
N/A 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.6.2.​
Xem chi tiết kỳ thi chấm điểm 
❖​ Actor: Member, Manager, Admin được assign (sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể xem danh sách các bài thi của kì thi được assign chấm điểm 
​
​
Page 35 of 96 
 


--- PAGE 45 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Request 
 ​ Tại màn hình [Xem danh sách các kì thi được assign], User click vào bất kì kỳ thi nào thì 
sẽ vào usecase này. 
❖​ Flow: 
 ​ Tại màn hình này, hệ thống sẽ hiển thị danh sách các bài thi và các thông tin cơ bản 
của bài thi, cụ thể như sau: 
Tên trường hiển thị 
Mô tả 
Format hiển thị 
User name / Mã code của 
kỳ thi 
Nếu User là Member, Manager, 
Admin thì hệ thống sẽ hiển thị 
“User name”  
Nếu User là Unregister User thì 
hệ thống sẽ hiện thị mã code kì 
thi 
Text 
Tên bài thi 
Tên của bài thi 
Text 
Chủ đề thi 
Chủ đề của bài thi  
Text 
Điểm tổng tự luận 
Điểm phần tự luận trong bài thi 
của User 
Text 
Action 
Nếu bài đã được chấm thì sẽ 
hiển thị button “Chấm thi”  
Nếu bài chưa được chấm thì sẽ 
hiển thị button “Chấm thi” 
Button / Image 
 
 ​ Danh sách bài thi sẽ được phân trang, cụ thể như mục [Paging] 
 ​ Mặc định thì danh sách bài thi sẽ được  
o​
Không Filter 
o​
Sorted theo column Action ( sẽ hiển thị các bài thi chưa chấm lên trước) 
 ​ Ngoài ra, khi User click vào button “Chấm thi” thì User có thể chấm thi (xem 
usecase [Xem chi tiết bài thi] ) 
 ​ User có thể thực hiện đồng thời các usecase sau: 
o​
Filter (xem usecase [Filter])  
o​
Sort(xem usecase [Sort])  
❖​ Other relevant functions: [Paging], [Sort], [Filter] 
❖​ Screen Design & Data Description 
​
​
Page 36 of 96 
 


--- PAGE 46 ---

 
Training System 
System Requirement Specification 
 
 
 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.6.2.1.​
Filter 
❖​ Actor: Member, Manager, Admin (sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể lọc danh sách các bài thi theo nhiều tiêu chí chọn  
❖​ Request 
 ​ User đang ở trong màn hình [Xem chi tiết kỳ thi]  
❖​ Flow: 
 ​ Tại màn hình [Xem chi tiết kỳ thi], User click vào button có biểu tượng filter  
o​
Nếu chưa hiển thị các điều kiện filter thì sẽ hiển thị các điều kiện đó ra  
o​
Nếu đã hiển thị các điều kiện filter thì sẽ ẩn các điều kiện đó đi 
 ​ Sau đó User có thể click vào các combo box để lựa chọn điều kiện lọc, cụ thể như 
sau: 
Tên Filter 
Các lựa chọn 
Mô tả 
Selecte
d 
Default 
Format 
Tên thí sinh 
- All 
- Tên một thí sinh 
đã tham gia kỳ thi 
hiện tại 
Lọc các bài thi theo tên 
thí sinh 
All 
Combo 
box 
Có 
thể 
search 
​
​
Page 37 of 96 
 


--- PAGE 47 ---

 
Training System 
System Requirement Specification 
 
 
Tên bài thi 
- All 
- Tên một bài thi 
của kỳ thi hiện tại 
Lọc các bài thi theo tên 
bài thi 
All 
Combo 
box 
Chủ đề thi 
- All 
- Tên một chủ đề 
thi của bài thi 
trong kỳ thi hiện 
tại 
Lọc các bài thi theo 
chủ đề thi 
All 
Combo 
box 
Trạng thái 
- All 
- Đã chấm 
- Chưa chấm 
Lọc các bà thi theo 
trạng thái. 
All 
Combo 
box 
Note: Có thể kết hợp các Filter lại với nhau 
 ​ Ngoài ra, User có thể kết hợp filter với  
o​
Sort(xem usecase  [Sort]) 
❖​ Other relevant functions: [Xem chi tiết kỳ thi], [Sort] 
❖​ Screen Design & Data Description 
 
Hình 21: ​
Validate Filter 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
​
​
Page 38 of 96 
 


--- PAGE 48 ---

 
Training System 
System Requirement Specification 
 
 
N/A 
4.2.6.2.2.​
Sort 
❖​ Actor: Member, Manager, Admin (sau đây sẽ gọi chung là User) 
❖​ Purpose: User có thể sắp xếp danh sách các bài thi của mình theo tiêu chí nào đó  
❖​ Request: 
 ​ User đang ở trong màn hình [Xem chi tiết kỳ thi] 
❖​ Flow: 
 ​ Tại màn hình  [Xem chi tiết kỳ thi] User có thể click vào tên các column để sắp xếp  
 ​ Các column được sắp xếp là: Tên thí sinh, Tên bài thi, Chủ đề thi, Điểm tổng tự 
luận, Action  
 ​ Sau đó, hệ thống sẽ hiển thị danh sách kỳ thi đã được sắp xếp theo column được 
click 
 ​ Chỉ sort được theo 1 trường 
 ​ Mặc định khi User không chọn thì sẽ sort theo trường Action (sẽ hiển thị các bài thi 
chưa chấm lên trước) 
 ​ Ngoài ra, User có thể kết hợp sort với  
o​
Filter(xem usecase [Filter] 
❖​ Other relevant functions: [Xem danh sách các kì thi được assign], [Filter] 
❖​ Screen Design & Data Description 
N/A 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.6.3.​
Xem chi tiết bài thi 
❖​ Actor: Member, Manager, Admin (Sau đây sẽ gọi chung là User) 
❖​ Purpose: User xem thông tin chi tiết của bài thi cần chấm điểm tự luận 
❖​ Require: 
 ​ User đã thực hiện Usecase [Xem chi tiết kỳ thi] và click vào button “Chấm thi” trên 
màn hình [Xem chi tiết kỳ thi] 
❖​ Flow: 
 ​ Ở usecase này, hệ thống sẽ hiển thị thông tin chi tiết của bài thi bao gồm: 
Tên trường hiển 
thị 
Mô tả 
Format 
hiển thị 
User name / Mã 
code của kỳ thi 
Nếu người làm bài là Member, Admin, Manager thì 
hệ thống sẽ hiển thị “User name” của người đó 
Nếu người làm bài là Unregistered User thì thì hệ 
thống sẽ hiển thị  “Mã code của bài thi đó”  
text 
Tên kỳ thi 
Tên kỳ thi của bài thi đang chấm 
text 
Tên bài thi 
Tên bài thi đang thi 
text 
Chủ đề thi 
Thể loại của bài thi 
text 
​
​
Page 39 of 96 
 


--- PAGE 49 ---

 
Training System 
System Requirement Specification 
 
 
1 bài thi chỉ có 1 thể loại 
VD: Sql 
Số câu hỏi tự luận 
Số câu hỏi tự luận có trong bài thi 
Integer 
>= 0 
Tổng điểm tự luận 
Tổng điểm của tất cả các câu hỏi tự luận của bài 
thi 
[Format 
điểm thi] 
 
 ​ Ngoài ra, khi User xem xong thông tin chi tiết của bài thi thì User có thể click vào 
button “Bắt đầu” để bắt đầu chấm bài thi (xem usecase [Chấm điểm]) 
❖​ Other relevant functions: [Chấm điểm], [Xem chi tiết kỳ thi] 
❖​ Screen Design & Data Description 
 
Hình 22: ​
Thông tin chi tiết của bài thi 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.6.4.​
Chấm điểm 
❖​ Actor: Member, Manager, Admin (Sau đây sẽ gọi chung là User) 
❖​ Purpose: User thực hiện chấm điểm phần tự luận của bài thi  
❖​ Require: 
 ​ User đã thực thi xong usecase [Xem chi tiết bài thi] 
❖​ Flow: 
 ​ Mỗi trang sẽ hiển thị 1 câu hỏi  
 ​ Mỗi câu bao gồm các thông tin: nội dung câu hỏi, phần trả lời của thí sinh và gợi ý 
đáp án của câu hỏi (nếu có) 
 
​
​
Page 40 of 96 
 


--- PAGE 50 ---

 
Training System 
System Requirement Specification 
 
 
 ​ Sau khi xem xong, User có thể cho điểm cho phần trả lời của thí sinh ngay trên màn 
hình này cụ thể như sau: 
o​
Hệ thống sẽ hiển thị thanh SeekBar để User cho điểm 
▪​
Đầu dưới của thanh SeekBar là 0, đầu trên là số điểm tối đa của câu 
hỏi đang chấm, bước nhảy của SeekBar là 0.25 
▪​
User drag thanh SeekBar để cho điểm cho câu hỏi đang chấm 
 
 ​ Khi chấm xong thì User có thể next câu hỏi tiếp theo, cụ thể như sau: 
o​
Nếu chưa phải câu hỏi cuối cùng của bài thi thì button “Next” sẽ hiện lên  
o​
Khi User click vào button “Next” thì hệ thống sẽ hiển thị câu hỏi tiếp theo 
 
 ​ User cũng có thể quay lại câu hỏi trước, cụ thể như sau: 
o​
Bắt đầu từ câu hỏi thứ 2 của bài thi thì button “Prev” sẽ hiện lên  
o​
Khi User click vào button “Prev” thì hệ thống sẽ hiển thị câu hỏi trước đó 
 
 ​ User có thể chỉnh sửa chấm điểm cho câu hỏi bằng cách quay lại quay hỏi cần sửa, 
sau đó sẽ thực hiện chỉnh sửa chấm điểm cho câu hỏi đó 
 
 ​ Khi chấm xong hết các câu thì User click vào button “submit” để hoàn thành việc 
chấm điểm cho 1 bài thi (xem usecase [Submit điểm]) 
o​
Button “Submit” chỉ hiển thị ở câu hỏi cuối  
❖​ Other relevant functions: [Xem chi tiết bài thi], [Submit điểm] 
❖​ Screen Design & Data Description 
 
Hình 23: ​
Chấm điểm câu hỏi tự luận 
❖​ Activities Flow 
N/A 
​
​
Page 41 of 96 
 


--- PAGE 51 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.6.4.1.​
Submit điểm 
❖​ Actor: Member, Manager, Admin (Sau đây sẽ gọi chung là User) 
❖​ Purpose: User Submit khi chấm điểm xong phần tự luận 
❖​ Require: 
 ​ User đang ở trong màn hình [Chấm điểm] 
 ​ Usecase này xảy ra khi  
o​
User đã cho điểm xong tất cả các câu hỏi tự luận 
❖​ Flow: 
 ​ Khi User click vào button “Submit điểm”, hệ thống sẽ hiển thị lên form xác nhận 
chấm điểm, cụ thể như sau: 
Code Message 
Sự kiện xảy ra khi click 
vào button “Có” 
Sự kiện xảy ra khi click 
vào button  “Không” 
NDUY_13 
Hệ thống sẽ lưu lại kết 
quả 
chấm 
điểm 
và 
chuyển màn hình về màn 
hình [Xem chi tiết kỳ thi] 
Tắt form xác nhân đi và 
tiếp tục chấm điểm 
 
❖​ Other relevant functions: [Chấm điểm], [Xem chi tiết kỳ thi] 
❖​ Screen Design & Data Description 
​
​
Page 42 of 96 
 


--- PAGE 52 ---

 
Training System 
System Requirement Specification 
 
 
 
Hình 24: ​
Form xác nhận Submit điểm 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.2.7.​ Xem thông báo 
N/A 
4.3.​
Admin  
4.3.1.​ Quản lý Tài Khoản 
4.3.1.1.​
Hiển thị danh sách tài khoản 
❖​ Đối tượng: Admin 
❖​ Mục đích: Hiển thị danh sách tài khoản. 
❖​ Yêu cầu:  
 ​ Danh sách các tài khoản trong hệ thông được hiển thị trong một bảng. Với mỗi 
dòng bao gồm các thông tin cơ bản của tài khoản như sau: Email, Username, 
Fullname, Department, Position, danh sách các nhóm của tài khoản. 
​
​
Page 43 of 96 
 


--- PAGE 53 ---

 
Training System 
System Requirement Specification 
 
 
 ​ List default sort theo trường username A->Z 
 ​ Admin có thể thực hiện các chức năng như search, sort và filter tài khoản ứng 
với các mô tả [Sort tài khoản],[Search tài khoản],[Filter tài khoản] 
❖​ Chức năng khác có liên quan:N/A 
4.3.1.1.1.​
Sort tài khoản 
❖​ Đối tượng: Admin 
❖​ Mục đích: Sắp xếp tài khoản theo chiều A-Z hoặc ngược lại 
❖​ Yêu cầu: 
 ​ Trong [Hiển thị danh sách tài khoản], admin có thể bấm vào tiêu đề của các 
trường: Email, Username, Fullname, Department, Position trong bảng danh 
sách đề thi để săp xếp đề thi theo chiều từ A-Z hoặc ngược lại với trường đã 
được click. 
❖​ Chức năng khác có liên quan: [Hiển thị danh sách tài khoản] 
4.3.1.1.2.​
Search tài khoản 
❖​ Đối tượng: Admin  
❖​ Mục đích: Tìm kiếm tài khoản thi theo username, fullname. 
❖​ Yêu cầu: 
 ​ Trong [Hiển thị danh sách tài khoản], admin nhập từ hoặc cụm từ muốn tìm 
kiếm từ bàn phím vào ô input vào ấn “Enter” hoặc click button “Search” thì 
danh sách đề thi có tiêu đề giống hoặc gần giống với cụm từ tìm kiếm sẽ 
được hệ thống hiển thị. 
❖​ Chức năng khác có liên quan: [Hiển thị danh sách tài khoản] 
4.3.1.1.3.​
Filter tài khoản 
❖​ Đối tượng: Admin  
❖​ Mục đích: Lọc tài khoản theo các tiêu chí 
❖​ Yêu cầu: 
 ​ Trong [Hiển thị danh sách tài khoản], admin có thể lọc đề thi theo form tiêu chí: 
o​
Department(VD: rrc,rdc,du) 
o​
Position(VD:Dev,QA,SM) 
 ​ Hệ thống sẽ hiển thị các đề thi đã được lọc. 
❖​ Chức năng khác có liên quan: [Hiển thị danh sách tài khoản] 
4.3.1.2.​
View profile User 
❖​ Actor: Admin 
❖​ Purpose: Admin có thể xem được người khác. 
❖​ Require: 
​
​
Page 44 of 96 
 


--- PAGE 54 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Flow: 
 ​ Tại màn hình View list Account, khi Admin click vào một Account hiển thị trên list thì 
hệ thống sẽ chuyển sang trang hiển thị thông tin cơ bản profile của riêng User. Bao 
gồm các trường: 
o​
Họ và tên 
o​
Username 
o​
Department 
o​
Position 
o​
Email 
o​
Groups Joined 
 
❖​ Other relevant functions: [View profile] 
❖​ Screen Design & Data Description 
❖​ Activities Flow 
N/A 
❖​ Sequense diagram 
N/A 
❖​ Pseudo code 
N/A 
4.3.2.​ Quản lý nhóm Tài Khoản 
4.3.2.1.​
View List nhóm tài khoản 
❖​ Đối tượng: Admin 
❖​ Mục đích: xem nhóm tài khoản 
❖​ Yêu cầu: 
 ​ Trong màn hình [View List nhóm tài khoản] thì list nhóm sẽ được hiển thị bao 
gồm các trường: Group Name, Members, Creator, Created Date. List ban 
đầu sẽ được sort theo field Created Date giảm dân, không có điều kiện 
search, filter 
❖​ Chức năng khác có liên quan:  
4.3.2.1.1.​
Search nhóm tài khoản 
❖​ Đối tượng: Admin 
❖​ Mục đích: Tìm kiếm nhóm tài khoản 
❖​ Yêu cầu: 
 ​ Trong màn hình [View List nhóm tài khoản] khi Admin nhập từ hoặc cụm từ 
muốn tìm kiếm từ bàn phím vào ô input vào ấn “Enter” hoặc click button 
“Search” thì danh sách nhóm có Group Name giống hoặc gần giống với cụm 
từ tìm kiếm sẽ được hệ thống hiển thị. 
❖​ Chức năng khác có liên quan: [View List nhóm tài khoản] 
4.3.2.1.2.​
Sort nhóm tài khoản 
❖​ Đối tượng: Admin 
​
​
Page 45 of 96 
 


--- PAGE 55 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Mục đích: Sắp xếp tài khoản theo chiều A-Z hoặc ngược lại 
❖​ Yêu cầu: 
 ​ Trong [View List nhóm tài khoản], admin có thể bấm vào tiêu đề của các 
trường: Group Name, Members, Creator, Created Date trong bảng danh 
sách nhóm để săp xếp list theo chiều từ A-Z hoặc ngược lại với trường đã 
được click. 
❖​ Chức năng khác có liên quan: [View List nhóm tài khoản] 
4.3.2.1.3.​
Filter nhóm tài khoản 
❖​ Đối tượng: Admin  
❖​ Mục đích: Lọc nhóm theo các tiêu chí 
❖​ Yêu cầu: 
 ​ Trong [View List nhóm tài khoản], admin có thể lọc đề thi theo form tiêu chí: 
o​
Created Date (VD: From 20/10/2017 To 20/12/2017) 
o​
Members 
❖​ Chức năng khác có liên quan: [View List nhóm tài khoản] 
4.3.2.2.​
Tạo nhóm tài khoản 
❖​ Đối tượng: Admin 
❖​ Mục đích: tạo nhóm tài khoản 
❖​ Yêu cầu: 
 ​ Trong [View List nhóm tài khoản], admin có thể click vào “tạo nhóm” và nhập 
tên nhóm. Tên nhóm không được để trống. Tên nhóm phải là duy nhất nếu 
trùng tên thì sẽ hiện lên thông báo “Group name is existed”. 
❖​ Chức năng khác có liên quan: [View List nhóm tài khoản] 
4.3.2.3.​
Details nhóm tài khoản 
❖​ Đối tượng: Admin 
❖​ Mục đích: View Details nhóm tài khoản 
❖​ Yêu cầu: 
 ​ Trong [View List nhóm tài khoản], admin có thể click vào tên nhóm để chuyển 
sang trang detail bao gồm các phần sau: 
o​
Tên nhóm 
o​
Ngày tạo 
o​
Người tạo 
o​
Số lượng thành viên 
​
​
Page 46 of 96 
 


--- PAGE 56 ---

 
Training System 
System Requirement Specification 
 
 
o​
List Account trong nhóm [Hiển thị danh sách tài khoản] 
●​ Danh sách các tài khoản trong hệ thông được hiển thị trong 
một bảng. Với mỗi dòng bao gồm các thông tin cơ bản của tài 
khoản như sau: Email, Username, Fullname, Department, 
Position, Ngày add vào nhóm. Danh sách mặc định ban đầu 
được hiển thị sort theo “Ngày add vào nhóm” giảm dần. 
●​ Trong [Hiển thị danh sách tài khoản], admin có thể bấm vào tiêu 
đề của các trường: Email, Username, Fullname, Department, 
Position, Ngày add vào nhóm trong bảng danh sách đề thi để 
săp xếp đề thi theo chiều từ A-Z hoặc ngược lại với trường đã 
được click. 
●​ Trong [Hiển thị danh sách tài khoản], admin nhập từ hoặc cụm 
từ muốn tìm kiếm từ bàn phím vào ô input vào ấn “Enter” hoặc 
click button “Search” thì danh sách tài khoản có fullname 
giống hoặc gần giống với cụm từ tìm kiếm sẽ được hệ thống 
hiển thị. 
●​ Trong [Hiển thị danh sách tài khoản], admin có thể lọc đề thi 
theo form tiêu chí: 
o​
Department(VD: rrc,rdc,du) 
o​
Position(VD:Dev,QA,SM) 
o​
Ngày add vào nhóm: VD: chọn ngày 10/02/2018 thì kết 
quả sẽ hiển thị danh sách các tài khoản được add vào 
nhóm kể từ ngày 10/02/2018 
 
❖​ Chức năng khác có liên quan: [View List nhóm tài khoản], [Hiển thị danh sách tài khoản] 
4.3.2.4.​
Update nhóm tài khoản 
4.3.2.4.1.​
Update tên nhóm tài khoản 
❖​ Đối tượng: Admin 
❖​ Mục đích: Update tên nhóm tài khoản 
❖​ Yêu cầu: 
 ​ Trong [View List nhóm tài khoản], admin có thể click vào tên nhóm để chuyển 
sang trang detail. Admin bấm vào update để sửa tên nhóm tài khoản, dữ liệu 
ban đầu được fill từ database.Tên nhóm không được để trống. Tên nhóm 
phải là duy nhất nếu trùng tên thì sẽ hiện lên thông báo “Group name is 
existed”.  
❖​ Chức năng khác có liên quan: [View List nhóm tài khoản] 
4.3.2.4.2.​
Update Account trong nhóm tài khoản 
❖​ Đối tượng: Admin 
❖​ Mục đích: Update Account nhóm tài khoản 
​
​
Page 47 of 96 
 


--- PAGE 57 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Yêu cầu: 
 ​ Trong [View List nhóm tài khoản], admin có thể click vào tên nhóm để chuyển 
sang trang detail. Admin bấm vào update để update Account trong nhóm tài 
khoản, dữ liệu ban đầu được fill từ database. Admin có thể chỉnh sửa thêm 
hoặc xóa các thành viên trong nhóm ở trên view và sau đó bấm OK. Dữ liệu 
sẽ được update lại trong database 
o​
Search Account: Admin có thể tìm kiếm Account theo “Họ và tên” 
hoặc “Tên đăng nhập” để hiển thị trong mục list Account được add 
vào nhóm. VD: Gõ “Ngọc” sẽ ra list bao gồm: “Nguyễn Văn Anh 
Ngọc”, “Đoàn Văn Ngọc”. 
o​
Add Account: Sau khi tìm kiếm xong thì Admin click vào tên của 
Account được hiển thị thì Account đó sẽ được chuyển sang list 
account group. Khi Account đã thuộc về group này thì sẽ hiển thị icon 
phân biệt rõ rang với những Account không thuộc group. 
o​
Remove Account: Admin di chuyển chuột vào các hàng của list 
account group để hiện button xóa. Admin có thể click vào nút xóa 
xuất hiện trên từng Account ở list account group để xóa bỏ Account 
đó ra khỏi group. Khi Account đã xóa khỏi group này thì sẽ tắt icon 
phân biệt rõ rang với những Account thuộc group. 
o​
Submit: Sau khi thêm hoặc xóa các thành viên trong group thì Admin 
click vào nút OK để lưu lại danh sách vào DataBase 
❖​ Chức năng khác có liên quan: [View List nhóm tài khoản] 
4.3.2.5.​
Delete nhóm tài khoản 
❖​ Đối tượng: Admin 
❖​ Mục đích: Xóa Account nhóm tài khoản 
❖​ Yêu cầu: 
 ​ Trong [View List nhóm tài khoản], admin có thể click vào check box một hoặc 
nhiều nhóm tài khoản vào bấm Delete.  
o​
Popup hiện lên thông báo “Bạn có muốn xóa không”. Nếu Admin 
chọn vào "không" thì Popup “xác nhận xóa" sẽ tắt đi và màn hình vẫn 
giữ nguyên. Nếu Admin click vào button "có" thì Popup xác nhận xóa 
sẽ tắt đi và xóa các bản ghi khỏi database sau đó sẽ hiện lên thông 
báo “xóa thành công” và thông báo này sẽ tự động tắt. Tiếp theo hệ 
thống sẽ tải lại list nhóm [View List nhóm tài khoản] 
o​
Khi chưa chọn đề thi thì button delete bị disable 
❖​ Chức năng khác có liên quan: [View List nhóm tài khoản] 
4.4.​
System  
4.4.1.​ Chấm điểm trắc nghiệm 
❖​ Actor: System 
❖​ Purpose: system tự động chấm điểm trắc nhiệm 
❖​ Request: 
​
​
Page 48 of 96 
 


--- PAGE 58 ---

 
Training System 
System Requirement Specification 
 
 
 ​ Khi user submit bài thi, system sẽ tự động chấm điểm trắc nhiệm của bài thi và lưu 
kết quả vào database 
 ​ Nếu bài thi có cả trắc nhiệm và tự luận thì hệ thống sẽ gửi thông báo cho account 
được assigned chấm điểm 
❖​ Other relevant functions: 
4.4.2.​ Quản lý thông báo 
❖​ Actor: System 
❖​ Purpose: System tự động gửi thông báo đến Account khi có các trường hợp này xảy ra: 
o​
Khi Account được thêm vào trong một kỳ thi. 
o​
Khi System chấm xong điểm thi trắc nghiệm. 
o​
Khi System chấm xong điểm trắc nghiệm và bài thi có cả câu hỏi tự luận 
❖​ Request:  
o​
Khi Account được add vào kỳ thi và bấm submit thì hệ thống sẽ tự gửi thông báo 
đến Account được add vào kỳ thi đấy. Thông báo sẽ được hiển thị tại tất cả các 
trang của Account được thêm vào kỳ thi ở vị trí nút hình chuông ở góc bên phải 
trên cùng của màn hình kèm theo số lượng thông báo mà Account chưa xem. 
VD: Account có 1 thông báo chưa xem thì sẽ hiện số 1 ở nút này. Account được 
add vào kỳ thi sẽ có thông báo là ANGOC02. 
o​
Khi System chấm xong điểm trắc nghiệm cho bài thi chỉ có câu hỏi trắc nghiệm 
thì hệ thống sẽ tự động gửi thông báo đến Account làm bài thi đó. 
o​
Nếu bài thi có cả trắc nhiệm và tự luận thì hệ thống sẽ gửi thông báo cho 
account được assigned chấm điểm 
❖​ Other relevant functions: N/A. 
4.4.3.​ Lưu thông tin User 
4.4.3.1.​
Lưu thông tin từ hệ thống User trả về 
❖​ N/A 
4.5.​
User Manager  
4.5.1.​ Quản lý Câu hỏi -  Đáp án 
❖​ Actor: Manager, Admin 
❖​ Purpose: Hệ thống cung cấp chức năng Quản lý câu hỏi, đáp án cho Manager để thực 
hiện các chức năng liên quan đến Câu hỏi, đáp án bao gồm các chức năng: 
o​
View list câu hỏi [View list Câu hỏi] 
o​
Create câu hỏi [Tạo câu hỏi] 
o​
Import list câu hỏi [Import  danh sách câu hỏi] 
o​
View detail câu hỏi [View chi tiết câu hỏi] 
o​
Update câu hỏi [Update câu hỏi] 
o​
Delete câu hỏi [Delete Question] 
❖​ Require: User đã đăng nhập vào hệ thống với role là Admin hoặc Manager. 
​
​
Page 49 of 96 
 


--- PAGE 59 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Flow: Trên trang home, Manager click chọn chức năng Quản lý câu hỏi - đáp án hệ 
thống sẽ redirect đến trang view list câu hỏi [View list Câu hỏi]. 
❖​ Other relevant functions: N/A 
4.5.1.1.​
View list Câu hỏi 
❖​ Actor: Manager, Admin 
❖​ Purpose: View list danh sách câu hỏi trong CSDL. 
❖​ Require: User đã đăng nhập vào hệ thống với role là Manager hoặc Admin. 
❖​ Flow: Trên trang view list câu hỏi hiển thị table danh sách câu hỏi. Mỗi hàng hiển thị 
thông tin của một câu hỏi gồm các trường: danh mục câu hỏi, người tạo, ngày tạo, mức 
độ khó của câu hỏi, nội dung câu hỏi, tag. 
 ​ Default:  Danh sách câu hỏi hiển thị tất cả các bản ghi từ CSDL lên, sắp xếp 
theo thời gian tạo giảm dần. Không có search hay filter theo bất kỳ tiêu chí nào. 
 ​ Hệ thống cho phép Manager Search [Search câu hỏi], Sort [Sort danh sách câu hỏi], 
Filter [Filter danh sách câu hỏi] trên danh sách câu hỏi. 
 ​ Danh sách câu hỏi được phân trang. 
 ​ Trên trang view list câu hỏi có các button thực hiện các chức năng: 
-​
Tạo tag: Manager click vào nút tạo tag, tại trang view list câu hỏi hiển thị ra 
popup cho phép tạo tag mới [Tạo Tag]. 
-​
Tạo câu hỏi: Manager click vào nút tạo câu hỏi để link đến trang create câu 
hỏi [Tạo câu hỏi]. 
 ​ Import danh sách câu hỏi: Manager click vào nút import câu hỏi để link đến 
trang import câu hỏi [Import  danh sách câu hỏi]. 
 ​ View detail câu hỏi: Manager click vào câu hỏi trong bảng để link đến trang 
view detail câu hỏi [View chi tiết câu hỏi]. 
 ​ Update nhiều câu hỏi: Manager click vào nút update, tại trang view list câu 
hỏi hiển thị ra popup cho phép update nhiều câu hỏi [Update nhiều câu hỏi]. 
 ​ Xóa câu hỏi: Manager click vào nút delete để delete nhiều câu hỏi [Delete 
Question]. 
❖​ Other relevant functions:  
o​
Search câu hỏi, Filter danh sách câu hỏi, Sort danh sách câu hỏi 
o​
Tạo câu hỏi, Import  danh sách câu hỏi, View chi tiết câu hỏi, Update câu hỏi, Delete 
Question. 
❖​ Screen Design & Data Description: 
❖​ Activities Flow: 
❖​ Sequense diagram: 
❖​ Pseudo code: 
​
​
Page 50 of 96 
 


--- PAGE 60 ---

 
Training System 
System Requirement Specification 
 
 
4.5.1.1.1.​
Search câu hỏi 
❖​ Actor: Manager, Admin 
❖​ Purpose: tìm kiếm câu hỏi trên danh sách câu hỏi. 
❖​ Require: User đã đăng nhập vào hệ thống và đang ở trang view list câu hỏi [View list 
Câu hỏi]. 
❖​ Flow: Hệ thống cho phép Manager tìm kiếm câu hỏi theo nội dung câu hỏi. Manager 
nhập từ hoặc cụm từ có trong nội dung câu hỏi cần tìm, sau khi submit(nhấn phím enter 
hoặc click nút tìm kiếm) hệ thống sẽ trả về danh sách kết quả trên trang view list câu hỏi 
[View list Câu hỏi]. 
❖​ Other relevant functions: View list Câu hỏi 
4.5.1.1.2.​
Filter danh sách câu hỏi 
❖​ Actor: Manager, Admin 
❖​ Purpose: View list danh sách câu hỏi trong CSDL. 
❖​ Require: User đã đăng nhập vào hệ thống và đang ở trang view list câu hỏi [View list 
Câu hỏi] 
❖​ Flow: Hệ thống cho phép Manager lọc danh sách câu hỏi theo các tiêu chí: người tạo, 
ngày tạo, loại câu hỏi, danh mục câu hỏi, mức độ khó, tag. 
❖​ Other relevant functions: View list Câu hỏi 
4.5.1.1.3.​
Sort danh sách câu hỏi 
❖​ Actor: Manager, Admin 
❖​ Purpose: Tạo tag câu hỏi. 
❖​ Require: User đã đăng nhập vào hệ thống và đang ở trang view list câu hỏi [View list 
Câu hỏi] 
❖​ Flow: Hệ thống cho phép Manager sắp xếp danh sách câu hỏi theo: ngày tạo, người 
tạo, loại câu hỏi, danh mục câu hỏi, tag. Với mỗi tiêu chí sort Manager có thể sắp xếp 
tăng dần hoặc giảm dần. 
❖​ Other relevant functions: View list Câu hỏi 
4.5.1.2.​
Tạo Tag 
❖​ Actor: Manager, Admin 
❖​ Purpose: Tạo tag cho câu hỏi 
❖​ Require: User đã đăng nhập vào hệ thống và đang ở trang view list câu hỏi [View list 
Câu hỏi] 
❖​ Flow: Hệ thống cho phép Manager tạo tag mới, trong form tạo tag Manager cần phải 
điền thông tin của tag bao gồm: 
​
​
Page 51 of 96 
 


--- PAGE 61 ---

 
Training System 
System Requirement Specification 
 
 
ST
T 
Tên 
trường 
Mô tả 
Default 
validate 
Message Lỗi 
1 
* Tên tag 
Hiển thị textbox cho 
Manager nhập tag. 
Null 
Require 
[NG_012] - “Tên 
tag không được 
để trống”. 
 
 ​ Sau khi nhập tên tag Manager nhấn submit để lưu tag mới vào hoặc nhấn 
cancel để hủy thêm mới tag. Sau khi thực hiện xong popup sẽ bị đóng lại. 
❖​ Other relevant functions: View list Câu hỏi 
❖​ Screen Design & Data Description: 
❖​ Activities Flow: 
❖​ Sequense diagram: 
❖​ Pseudo code: 
4.5.1.3.​
Tạo câu hỏi 
❖​ Actor: Manager, Admin 
❖​ Purpose: Tạo câu hỏi 
❖​ Require: User đã đăng nhập vào hệ thống và đang ở trang tạo câu hỏi [Tạo câu hỏi]. 
❖​ Flow: Tại màn hình này Manager phải điền thông tin của câu hỏi và đáp án gồm các 
trường: 
ST
T 
Tên 
trường 
Mô tả 
Default 
validate 
Message Lỗi 
1 
* 
Category 
Question 
Hiển thị comboBox 
Category Question 
cho Manager chọn. 
Null 
Require 
Nút save không 
bấm được 
 
2 
* 
Question 
Type 
Hiển thị comboBox 
cho Manager chon. 
Có 2 loại: Câu hỏi 
Essay và Multiple 
choice 
Essay 
Require 
Nút save không 
bấm được 
 
3 
* Level 
Hiển thị comboBox 
cho Manager chon. 
Có 3 mức độ: easy, 
medium, diffcult 
Null 
Require 
Nút save không 
bấm được 
 
4 
* Content 
.Hiển thị textbox cho 
Manager nhập nội 
dung câu hỏi. Nội 
dung có thể có chứa 
ảnh 
Null 
Require 
Nút save không 
bấm được 
 
​
​
Page 52 of 96 
 


--- PAGE 62 ---

 
Training System 
System Requirement Specification 
 
 
5 
* Answer 
correct 
Hiển thị textbox cho 
Manager nhập đáp án 
đúng. 
Null 
Require 
Nút save không 
bấm được 
 
6 
* Answer 
wrong 
Hiển thị textbox cho 
Manager nhập đáp án 
sai. 
Null 
Require 
Nút save không 
bấm được 
 
7 
Suggesti
on 
Hiển thị textbox cho 
Manager nhập gợi ý 
đáp án 
Null 
 
 
 
 ​ Sau khi Manager chọn loại câu hỏi sẽ hiển thị phần điền đáp án.  
o​
Câu hỏi tự luận chỉ điền Suggestion. 
o​
Câu hỏi trắc nghiệm thì điền Answer correct và Answer wrong. Câu hỏi 
trắc nghiệm cho phép thêm hoặc xóa Answer correct và Answer wrong. 
❖​ Other relevant functions: View list Câu hỏi 
❖​ Screen Design & Data Description: 
❖​ Activities Flow: 
❖​ Sequense diagram: 
❖​ Pseudo code: 
4.5.1.4.​
Import  danh sách câu hỏi  
❖​ Actor: Manager, Admin 
❖​ Purpose: Import list các câu hỏi từ file excel vào CSDL. 
❖​ Require: User đã đăng nhập vào hệ thống và đang ở trang import danh sách câu hỏi 
[Import  danh sách câu hỏi]. 
❖​ Flow: Tại trang này, Manager click vào upload file để upload file dữ liệu câu hỏi. 
o​
Yêu cầu về file dữ liệu: 
▪​
Phải là file excel (phần mở rộng là: xlsx, xlsm, xlsb, xltx, xls, xlt) 
▪​
File phải đúng template (Có file template mẫu để Manager download 
xem). 
 ​ Các bước import: 
-​
Manage chọn file upload từ máy local lên. 
-​
Sau đó submit để hệ thống kiểm tra và đọc file. 
-​
Sau khi đọc file xong sẽ hiển thị lên danh sách câu hỏi đã đọc gồm các 
thông tin: nội dung câu hỏi, đáp án. 
-​
Cuối cùng Manager click vào nút insert để insert list câu hỏi vào CSDL 
hoặc click nút cancel để hủy. Insert thành công hệ thống sẽ hiển thị thông 
báo “Import thành công”.  
 ​ Các trường hợp gây lỗi: 
▪​
File upload không phải là file excel, hệ thống hiển thị message lỗi:  
●​ [NG_08] - “File upload không đúng định dạng”.  
▪​
Không đọc được file: file upload không đúng format như file template 
mẫu, hệ thống hiển thị message lỗi: 
●​ [NG_09] - “Không đọc được file”. 
​
​
Page 53 of 96 
 


--- PAGE 63 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Other relevant functions: View list Câu hỏi 
❖​ Screen Design & Data Description: 
❖​ Activities Flow: 
❖​ Sequense diagram: 
❖​ Pseudo code: 
4.5.1.5.​
View chi tiết câu hỏi 
❖​ Actor: Manager, Admin 
❖​ Purpose: View chi tiết câu hỏi. 
❖​ Require: User đã đăng nhập vào hệ thống và đang ở trang view chi tiết câu hỏi [View chi 
tiết câu hỏi]. 
❖​ Flow:Tại trang này hệ thống hiển thị các thông tin của câu hỏi bao gồm: 
o​
Người tạo 
o​
Ngày tạo 
o​
Danh mục câu hỏi 
o​
Loại câu hỏi 
o​
Mức độ khó của câu hỏi 
o​
Tag 
o​
Nội dung câu hỏi 
o​
Danh sách đáp án của câu hỏi (gợi ý đáp án nếu là câu hỏi tự luận). 
Trên trang này Manager click vào update câu hỏi để chuyển sang trang update Câu hỏi 
[Update câu hỏi]. 
❖​ Other relevant functions: Update câu hỏi 
❖​ Screen Design & Data Description: 
❖​ Activities Flow: 
❖​ Sequense diagram: 
❖​ Pseudo code: 
4.5.1.6.​
Update câu hỏi 
❖​ Actor: Manager, Admin 
❖​ Purpose: Update câu hỏi. Có 2 loại update 
o​
Update từng câu: Update từng câu hỏi 
o​
Update nhiều câu: Update nhiều câu hỏi 
​
​
Page 54 of 96 
 


--- PAGE 64 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Require: User đã đăng nhập vào hệ thống với Role là Manager hoặc Admin. 
4.5.1.6.1.​
Update nhiều câu hỏi 
❖​ Flow: Hệ thống cho phép Manager update các thông tin chung bao gồm: 
ST
T 
Tên trường 
Mô tả 
Default 
1 
Mức độ khó 
Hiển thị comboBox cho phép chọn 
Dễ 
2 
Danh mục câu hỏ 
Hiển thị comboBox cho phép chọn 
Null 
3 
Tag câu hỏi 
Hiển thị comboBox cho phép chọn 
Null 
 
 ​ Hệ thống cho phép Manager chọn nhiều tag. 
 ​ Nếu Manager click vào update mà không có câu hỏi nào được tích chọn thì sẽ hiển 
thị thông báo lỗi: [NG_12] - “Chưa có bản ghi nào được chọn”. 
 ​ Manager nhấn submit để cập nhật các thay đổi vào CSDL, nhấn cancel để hủy các 
thay đổi. 
❖​ Other relevant functions: View list Câu hỏi 
❖​ Screen Design & Data Description: 
❖​ Activities Flow: 
❖​ Sequense diagram: 
❖​ Pseudo code: 
4.5.1.6.2.​
Update từng câu hỏi 
❖​ Flow: Tại trang này, Hệ thống cho phép Manager có thể update các thông tin: nội dung 
câu hỏi, nội dung câu hỏi, danh mục câu hỏi, mức độ khó câu hỏi, tag câu hỏi, gợi ý đáp 
án (với câu hỏi tự luận), đáp án (đáp án đúng, đáp án sai với câu hỏi trắc nghiệm).  
 ​ Default dữ liệu tại các trường được fill từ CSDL lên. 
 ​ Validate, message lỗi giống như tạo câu hỏi. Tham khảo tại mục [Tạo câu 
hỏi]. 
 ​ Nếu là câu hỏi trắc nghiệm Manager có thể thêm, xóa textbox cho đáp án 
đúng đúng và đáp án sai. 
❖​ Other relevant functions: View Detail Question 
❖​ Screen Design & Data Description: 
❖​ Activities Flow: 
❖​ Sequense diagram: 
❖​ Pseudo code: 
4.5.1.7.​
Delete Question 
​
​
Page 55 of 96 
 


--- PAGE 65 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Actor: Manager, Admin 
❖​ Purpose: Xóa câu hỏi 
❖​ Require: User đã đăng nhập vào hệ thống với Role là Manager hoặc Admin, và đang ở 
trang view list câu hỏi [View list Câu hỏi] 
❖​ Flow: Manager tích chọn các câu hỏi muốn xóa trên màn hình view list [View list Câu 
hỏi] sau đó chọn delete để xóa các câu hỏi.  
o​ Khi click nút xóa sẽ hiển thị popup xác nhận xóa với thông báo: “Are you sure 
you want to delete 1 question?”, số câu hỏi muốn xóa sẽ ứng với số câu hỏi đã 
được check để xóa. 
o​ Nếu Manager đồng ý thì các bản ghi này sẽ bị xóa đi, và hiển thị message thông 
báo xóa thành công. 
o​ Nếu Manager click chưa chọn bản ghi để xóa thì nút delete sẽ bị disable. 
 ​ Khi xóa câu hỏi thì đáp án tương ứng của câu hỏi đó cũng phải xóa khỏi CSDL. 
 ​ Sau khi xóa thì câu hỏi sẽ bị xóa khỏi CSDL và bảng view list sẽ refresh lại. 
❖​ Other relevant functions: View list Câu hỏi 
❖​ Screen Design & Data Description: 
❖​ Activities Flow: 
❖​ Sequense diagram: 
❖​ Pseudo code: 
4.5.2.​ Quản lý Category Câu hỏi 
❖​ Actor: Manager  
❖​ Purpose: User Manager sau khi đăng nhập hệ thống chọn chức năng Manage 
Category of Question. Chức năng này sẽ tạo ra các Category của câu hỏi ví dụ như: 
Category Java, PHP, SQL. 
4.5.2.1.​
View list Category Câu hỏi 
❖​ Actor: Manager, Admin 
❖​ Purpose: View list danh sách Category câu hỏi trong CSDL. 
❖​ Require: User đã đăng nhập vào hệ thống với role là Manager hoặc Admin. 
❖​ Flow: Trên trang view list Category câu hỏi hiển thị table danh sách Category câu hỏi. 
Mỗi hàng hiển thị thông tin của một câu hỏi gồm các trường: Category name, code, 
Creator, Created Date. 
 ​ Default:  Danh sách câu hỏi hiển thị tất cả các bản ghi từ CSDL lên, sort theo 
Created Date giảm dần. Không filter theo bất kỳ tiêu chí nào và search theo field 
Category Name. 
 ​ Hệ thống cho phép Manager Search [Search Category câu hỏi], Sort [Sort danh 
sách Category câu hỏi], trên danh sách Category câu hỏi. 
 ​ Danh sách câu hỏi được phân trang. 
​
​
Page 56 of 96 
 


--- PAGE 66 ---

 
Training System 
System Requirement Specification 
 
 
 ​ Trên trang view list Category câu hỏi có các button thực hiện các chức năng: 
-​
Tạo Category câu hỏi: Manager click vào nút tạo câu hỏi để link đến trang 
create Category câu hỏi [Tạo category câu hỏi]. 
 ​ Update Category câu hỏi: Manager click vào nút update, tại trang view list 
Category câu hỏi hiển thị ra popup cho phép update Category câu hỏi 
[Update category câu hỏi]. 
 ​ Xóa Category câu hỏi: Manager click vào nút delete để delete Category câu 
hỏi [Delete category câu hỏi]. 
❖​ Other relevant functions:  
o​
[Search Category câu hỏi], [Sort danh sách Category câu hỏi] 
o​
[Tạo category câu hỏi], [Update category câu hỏi], [Delete category câu hỏi] 
❖​ Screen Design & Data Description: 
❖​ Activities Flow: 
❖​ Sequense diagram: 
❖​ Pseudo code: 
4.5.2.1.1.​
Search Category câu hỏi 
❖​ Actor: Manager, Admin 
❖​ Purpose: tìm kiếm category câu hỏi trên danh sách category câu hỏi. 
❖​ Require: User đã đăng nhập vào hệ thống và đang ở trang view list category câu hỏi 
[View list Category Câu hỏi]. 
❖​ Flow: Hệ thống cho phép Manager tìm kiếm category câu hỏi theo name category câu 
hỏi. Manager nhập từ hoặc cụm từ có trong nội dung câu hỏi cần tìm, sau khi 
submit(nhấn phím enter hoặc click nút tìm kiếm) hệ thống sẽ trả về danh sách kết quả 
trên trang view list category câu hỏi [View list Category Câu hỏi]. 
❖​ Other relevant functions: View list Câu hỏi 
4.5.2.1.2.​
Sort danh sách Category câu hỏi 
❖​ Actor: Manager, Admin 
❖​ Purpose: sort category câu hỏi. 
❖​ Require: User đã đăng nhập vào hệ thống và đang ở trang view list category câu hỏi 
[View list Category Câu hỏi] 
❖​ Flow: Hệ thống cho phép Manager sắp xếp danh sách câu hỏi theo: Category name, 
code, Creator, Created Date. Với mỗi tiêu chí sort Manager có thể sắp xếp tăng dần 
hoặc giảm dần. 
❖​ Other relevant functions: View list Category Câu hỏi 
4.5.2.2.​
Tạo category câu hỏi 
​
​
Page 57 of 96 
 


--- PAGE 67 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Tạo mới một Category cho câu hỏi 
❖​ Yêu cầu:  
 ​ Bấm nút thêm category sẽ chuyển sang pop-up thêm category câu hỏi bao 
gồm các mục sau:  
o​
Category Name* 
Ví dụ như: Câu hỏi Java, Câu hỏi Php, Câu hỏi Sql. Tiêu đề không 
được 
trống, 
nếu 
trống 
sẽ 
có 
thông 
báo  
CREATE_ERROR_CATEGORY_QUESTION_REQUIRE 
4.5.2.3.​
Update category câu hỏi 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Update một Category cho câu hỏi 
❖​ Yêu cầu:  
 ​ Bấm vào một hàng category trên trang view list sẽ chuyển sang trang detail. 
Sau đó bấm vào icon edit để sửa category câu hỏi bao gồm các mục sau: 
o​
Category Name* 
Name được bind dữ liệu lấy từ database và cho phép sửa trên tiêu 
đề đã được lấy từ database, nếu trống sẽ có thông báo 
CREATE_ERROR_CATEGORY_QUESTION_REQUIRE 
4.5.2.4.​
Delete category câu hỏi 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Delete Category cho câu hỏi 
❖​ Yêu cầu:  
 ​ Tích chọn các category muốn xóa 
 ​ Sau đó, bấm nút xóa category sẽ hiện lên pop-up có nội dung là “Are you 
sure you want to delete question [number] categories?”. Trong đó [number] 
chính là số Category câu hỏi cần xóa. 
 ​ Nếu Manager đồng ý thì các bản ghi này sẽ bị xóa đi, và hiển thị message 
thông báo xóa thành công. 
 ​ Nếu Manager click chưa chọn bản ghi để xóa thì nút delete sẽ bị disable. 
 ​ Sau khi xóa thì bản ghi sẽ bị xóa khỏi CSDL và bảng view list sẽ refresh lại. 
4.5.3.​ Quản lý Đề thi 
4.5.3.1.​
Tạo Đề thi 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Tạo mới một đề thi từ danh sách câu hỏi 
​
​
Page 58 of 96 
 


--- PAGE 68 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Yêu cầu: 
 ​ Từ [Hiển thị danh sách đề thi], manager click tạo mới để tạo một đề thi. Trong 
[Tạo Đề thi] manager điền thông tin đề thi: tiêu đề đề thi, loại đề thi, thời gian 
thi, note. 
 ​ Mã đề thi sẽ được hệ thống tự sinh. 
 ​ Đề thi mới được tạo ra có trạng thái là: Draft. 
 ​ Khi chưa fill các trường tiêu đề, loại đề, thời gian thì nút submit sẽ bị disable 
 ​ Manager click submit, hệ thống sẽ lưu đề thi vào database. 
 ​ Manager click vào nút reset để xóa các trường đã fill về trống. 
❖​ Chức năng khác có liên quan:[Hiển thị danh sách đề thi] 
4.5.3.2.​
Hiển thị danh sách đề thi 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Hiển thị danh sách đề thi 
❖​ Yêu cầu:  
 ​ Danh sách đề thi sẽ được hiển thị trong bảng và được phân trang với số bản 
ghi trên một bảng lấy từ cơ sở dữ liệu. Với mỗi dòng hiển thị sẽ bao gồm các 
thông tin cơ bản của một đề thi: tiêu đề đề thi, loại đề thi, thời gian, số lượng 
câu hỏi, người tạo, trạng thái, ngày tạo. 
 ​ Default: hiển thị tất cả các các đề thi trong cơ sở dữ liệu theo ngày tạo từ 
Z-A. 
 ​ Manager ấn vào “import” chuyển đến upload file. 
 ​ Manager ấn vào “tạo mới” sẽ chuyển đến [Tạo Đề thi]. 
 ​ Manager tích chọn một hoặc nhiều đề thi vào ấn “delete” sẽ thực hiện chức 
năng xóa đề thi. 
 ​ Manager có thể kết hợp [Sort đề thi],[Search đề thi],[Filter đề thi] để tìm kiếm 
chính xác đề thi. 
 ​ Manager ấn vào tiều đề của đề thi để chuyển sang [Details đề thi]. 
❖​ Chức năng khác có liên quan:N/A 
4.5.3.2.1.​
Sort đề thi 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Sắp xếp đề thi theo chiều A-Z hoặc ngược lại 
❖​ Yêu cầu: 
 ​ Trong [Hiển thị danh sách đề thi], manager có thể bấm vào tiêu đề của các 
trường: tiêu đề đề thi, loại đề thi, thời gian, số lượng câu hỏi, người tạo, 
​
​
Page 59 of 96 
 


--- PAGE 69 ---

 
Training System 
System Requirement Specification 
 
 
trạng thái, ngày tạo trong bảng danh sách đề thi để săp xếp đề thi theo chiều 
từ A-Z hoặc ngược lại với trường đã được click. 
❖​ Chức năng khác có liên quan: [Hiển thị danh sách đề thi] 
4.5.3.2.2.​
Search đề thi 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Tìm kiếm đề thi theo tiêu đề 
❖​ Yêu cầu: 
 ​ Trong [Hiển thị danh sách đề thi], manager nhập từ hoặc cụm từ muốn tìm 
kiếm từ bàn phím vào ô input vào ấn “Enter” hoặc click button “Search” thì 
danh sách đề thi có tiêu đề giống hoặc gần giống với cụm từ tìm kiếm sẽ 
được hệ thống hiển thị. 
❖​ Chức năng khác có liên quan: [Hiển thị danh sách đề thi] 
4.5.3.2.3.​
Filter đề thi 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Lọc đề thì theo các tiêu chí 
❖​ Yêu cầu: 
 ​ Trong [Hiển thị danh sách đề thi], manager có thể lọc đề thi theo form tiêu chí: 
o​
Loại đề thi: 
●​ Sql 
●​ Java 
●​ C# 
●​ Tiếng Anh 
o​
Thời gian thi: 
●​ 30 – 60 phút 
o​
Số lượng câu hỏi: 
●​ 10 
●​ 20 
●​ 30 
o​
Ngày tạo 
o​
Người tạo: filter theo tên account có quyền Admin, Manager 
o​
Trạng thái: 
o​
Public 
​
​
Page 60 of 96 
 


--- PAGE 70 ---

 
Training System 
System Requirement Specification 
 
 
o​
draft 
 ​ Hệ thống sẽ hiển thị các đề thi đã được lọc. 
❖​ Chức năng khác có liên quan: [Hiển thị danh sách đề thi] 
4.5.3.3.​
Details đề thi 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Xem chi tiết của đề thi 
❖​ Yêu cầu: 
 ​ Mananger chọn đề thi trong [Hiển thị danh sách đề thi]. 
 ​ Hệ thống chuyển sang trang chi tiết của đề thi và hiển thị tất cả thông tin chi 
tiết của đề thi: mã đề thi, tiêu đề, loại, thời gian thi, số lượng câu hỏi, assign, 
ngày tạo, người tạo, note, nội dung đề thi. Có thêm các button chức năng 
“update” và “export”. Khi nhấn các button này sẽ thực hiện chức năng ứng 
với hoạt động của nó được mô tả trong [Update Đề thi],[Export đề thi] 
❖​ Chức năng khác có liên quan: [Hiển thị danh sách đề thi] 
4.5.3.4.​
Update Đề thi 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Sửa lại một vài trường của đề thi 
❖​ Yêu cầu: 
 ​ Manager click vào “phần chung” trong sidebar left để chỉnh các trường: tiêu 
đề, loại đề thi, thời gian thi. 
 ​ Để thêm câu hỏi cho nội dung đề thi hoặc xóa câu hỏi trong nội dung đề thi, 
manager click vào “Nôi dung đề thi” trong sidebar left để thêm câu hỏi như 
mô tả trong [Thêm câu hỏi] hoặc xóa câu hỏi trong nội dung của đề thi như mô 
tả trong[Xóa câu hỏi]. 
 ​ Khi vào [Update đề thi], sidebar left sẽ thay đổi hiển thị cho manager 2 phần: 
update phần chung, update nội dung đề thi. 
 ​ Manager có thể click vào button Public để public đề thi. Với trạng thái này thì 
manager có thể add đề thi vào kỳ thi.  
 ​ Với update phần chung, nếu manager click submit mà bỏ trống các trường: 
tiêu đề, loại đề thi, thời gian thi. Hệ thống sẽ thông báo lỗi cho manager như 
sau: 
Tên trường 
Lỗi 
Mã messges 
Tiều đề đề thi 
Tiêu đề đề thi để trống 
MS_001 
Loại đề thi 
Loại đề thi để trống 
MS_002 
Thời gian thi 
Thời gian thi để trống 
MS_003 
Thời gian thi 
Thời gian thi lớn hơn 8 
MS_004 
​
​
Page 61 of 96 
 


--- PAGE 71 ---

 
Training System 
System Requirement Specification 
 
 
 
❖​ Chức năng khác có liên quan:[Details đề thi] 
4.5.3.4.1.​
Hiển thị danh sách câu hỏi add vào Đề thi 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Hiển thị danh sách câu hỏi để add vào đề thi. 
❖​ Yêu cầu: 
 ​ Trong [Update đề thi] và phần update “Content”, thi thì danh sách câu hỏi 
được hiển thi theo loại đề thi dưới dạng tabs. Với 2 tab là: 
▪​
Trắc nghiệm:hiển thị danh sách câu hỏi có loại câu hỏi là trắc nghiệm 
theo dạng bảng. Với mỗi dòng bao gồm thông tin cơ bản của câu hỏi: 
nội dung câu hỏi, danh mục, level. 
▪​
Tự luận:như hiển thị câu hỏi trắc nghiệm. 
 ​ Danh sách câu hỏi được hiển thị sẽ được phân trang với số bản ghi trên một 
trang lấy từ cơ sở dữ liệu và có thể kết hợp thực hiện các chức năng: [Search 
Câu hỏi],[Filter Câu hỏi],[Sort Câu hỏi] 
❖​ Chức năng khác có liên quan:[Tạo Đề thi],[View list Câu hỏi] 
4.5.3.4.1.1.​
Search Câu hỏi add vào Đề thi 
❖​ Đối tượng: Manager, Admin 
❖​ Chức năng khác có liên quan:[Tạo Đề thi],[Hiển thị danh sách câu hỏi add vào Đề 
thi],[Search câu hỏi]  
4.5.3.4.1.2.​
Filter Câu hỏi add vào Đề thi 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Lọc câu hỏi theo các tiêu chí 
❖​ Yêu cầu: 
 ​ Trong [Tạo Đề thi], sau khi manager chọn loại đề thi. Hệ thống hiển thị danh 
sách câu hỏi đã được lọc theo danh mục câu hỏi và sẽ được phân thành 2 
loại trắc nghiệm và tự luân. 
 ​ Trong [Hiển thị danh sách câu hỏi], manager chọn tiêu chi lọc trong form lọc: 
o​
Level: 
▪​
Khó 
▪​
Dễ 
▪​
Trung bình 
 ​ Hệ thống sẽ hiển thị danh sách được lọc. Nếu tiêu chí trong form lọc được 
để trống thì danh sách câu hỏi sẽ hiển thị tất cả câu hỏi trong danh mục câu 
hỏi. 
​
​
Page 62 of 96 
 


--- PAGE 72 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Chức năng khác có liên quan: [Tạo Đề thi], [Hiển thị danh sách câu hỏi add vào Đề thi], 
[Filter danh sách câu hỏi] 
4.5.3.4.1.3.​
Sort Câu hỏi add vào Đề thi 
❖​ Đối tượng: Manager, Admin 
❖​ Chức năng khác có liên quan: [Hiển thị danh sách câu hỏi], [Sort danh sách câu hỏi] 
4.5.3.4.2.​
Thêm Câu hỏi vào Đề thi 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Thêm câu hỏi cho nội dung đề thi. 
❖​ Yêu cầu: 
 ​ Trong [Update Đề thi], phần update “Nội dung đề thi” hệ thống hiển thị 2 tabs 
đó là: 
▪​
Tabs nội dung đề thi: hiển thị danh sách câu hỏi của đề thi như trong 
mô tả [Hiển thị danh sách câu hỏi add vào Đề thi]. 
▪​
Tabs danh sách câu hỏi: hiển thị danh sách câu hỏi trong cơ sở dữ 
liệu theo loại đề thi như mô tả [Hiển thị danh sách câu hỏi add vào Đề 
thi]. 
 ​ Manager có thể thêm câu hỏi vào tabs nội dung đề thi bằng 2 cách: 
▪​
Thêm câu hỏi bằng tay: 
●​ Trong tabs danh sách câu hỏi, manager có thể tích chọn để 
chọn câu hỏi và sau đó ấn nút “Apply” để thêm câu hỏi đó vào 
nội dung đề thi. 
●​ Khi mà manager chưa chọn bất kì câu hỏi nào thì nút “Apply” 
sẽ bị disable.  
●​ Manager có thể kết hợp [Search Câu hỏi add vào Đề thi],[Filter 
Câu hỏi add vào Đề thi] và [Sort Câu hỏi add vào Đề thi] để tìm 
kiếm câu hỏi thêm vào nội dung đề thi trong danh sách câu 
hỏi. 
▪​
Thêm câu hỏi bằng cách random: 
●​ Trong tabs danh sách câu hỏi, manager tích chọn vào 
“Random” thì ô input nhập số lượng câu hỏi random sẽ được 
hiển thị.  
●​ Manager sẽ nhập số lượng câu hỏi muốn random sau đó ấn 
“Apply”. Hệ thống sẽ tự động chọn câu hỏi trong danh sách 
câu hỏi đã được hiển thị để thêm vào tabs nội dung câu hỏi 
theo số lượng câu hỏi đã được nhập. 
●​ Khi chưa tích chọn vào “Random” thì ô input nhập số lượng 
câu hỏi sẽ bị ẩn đi và “Apply” sẽ bị disable. 
​
​
Page 63 of 96 
 


--- PAGE 73 ---

 
Training System 
System Requirement Specification 
 
 
●​ Manager có thể kết hợp [Search Câu hỏi add vào Đề thi], [Filter 
Câu hỏi add vào Đề thi] và [Sort Câu hỏi add vào Đề thi] để giới 
hạn danh sách random. 
 ​ Câu hỏi được thêm vào là câu tự luận thì manager phải cập nhật điểm cho 
câu hỏi như mô tả [Điểm câu tự luận]. 
 ​ Cập nhật điểm cho câu hỏi trắc nghiệm: 
▪​
Cho phép set điểm cho toàn bộ câu hỏi trắc nghiệm theo level. VD: 
set toàn bộ câu hỏi trắc nghiệm có level khó trong đề thi là 3 điểm, 
trung bình là 2 điểm, dễ là 1 điểm 
 ​ Cập nhật điểm cho câu hỏi tự luận: 
▪​
Trong [Update Đề thi] ở tabs nội dung câu hỏi, với danh sách câu hỏi 
tự luận manager có thể click mở từng câu để thêm điểm cho câu hỏi. 
❖​ Chức năng khác có liên quan:[Update đề thi], [Hiển thị danh sách câu hỏi add vào Đề thi] 
4.5.3.4.3.​
Xóa câu hỏi trong Đề thi 
4.5.3.5.​
Export đề thi 
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Sửa lại một vài trường của đề thi 
❖​ Yêu cầu: 
 ​ Trong [Details đề thi], manager ấn vào “Export” hệ thỗng sẽ xuất đề thi cho 
manager dưới dạng pdf. 
❖​ Chức năng khác có liên quan:[Details đề thi] 
4.5.3.6.​
Import đề thi 
❖​ Đối tượng: User Manager  
❖​ Đối tượng: Manager, Admin 
❖​ Mục đích: Hiển thị danh sách câu hỏi 
❖​ Yêu cầu: 
 ​ Trong [Hiển thị danh sách đề thi], manager ấn vào “import” sẽ chuyển sang 
trang upload file. 
 ​ File upload sẽ phải là file excel vào có phần mở rộng là: xlsx,xlsm,xls. Và cấu 
trúc trong file phải theo một Templedethi.xls. Nếu file upload lên là sai định 
dạng thì hệ thông báo cho manager với nội dung của thông báo ứng với mã 
thông báo là [MS_005]. 
 ​ Sau khi upload thành công, hệ thống sẽ hiển thị thông tin chi tiết của đề thi 
được import như mô tả [Details đề thi]. Và manager có thể ấn “submit” để lưu 
đề thi vào cơ sở dữ liệu hoặc có thể cancel để hủy import đề thi. 
❖​ Chức năng khác có liên quan: [Hiển thị danh sách đề thi] 
​
​
Page 64 of 96 
 


--- PAGE 74 ---

 
Training System 
System Requirement Specification 
 
 
4.5.3.7.​
Delete Đề thi 
❖​ Đối tượng: Manager, Admin  
❖​ Mục đích: xóa đề thi 
❖​ Yêu cầu: 
 ​ Trong [Hiển thị danh sách đề thi], manager có thể tích chọn một đề thi hoặc 
nhiều đề thi và ấn “delete”. Hệ thống sẽ hiển thị popup confim “Bạn có muốn 
xóa đề thi không?”. 
 ​ Manager click “có” thì đề thi sẽ được hệ thống xóa trong cơ sở dữ liệu và 
bảng hiển thị danh sach đề thi sẽ được load lại. 
 ​ Đề thi ở trạng thái public sẽ không chọn để xóa được 
 ​ Khi chưa chọn đề thi thì button delete bị disable 
 ​ Manager click “Không” pupop sẽ được đóng lại. 
 ​ Sau khi xóa thì bản ghi sẽ bị xóa khỏi CSDL và bảng view list sẽ refresh lại. 
❖​ Chức năng khác có liên quan:[Hiển thị danh sách đề thi] 
4.5.4.​Quản lý Kỳ thi 
4.5.4.1.​
Tạo Kỳ thi 
4.5.4.1.1.​
Tạo Mới Kỳ Thi 
❖​ Actor: Manager, Admin 
❖​ Purpose: Manager/Admin tạo kì thi mới 
ST
T 
THÀNH 
PHẦN 
MÔ TẢ YÊU CẦU 
NGOẠI LỆ (Error 
Message) 
CHỨC NĂNG 
LIÊN QUAN 
1 
TÊN CỦA KỲ 
THI 
- Đây là tên hiển thị của kỳ thi sau 
khi tạo. Ở form input nhập tên của 
kỳ thi 
●​ Để trống tên của kỳ 
thi (DH01) 
●​ Screen Design: 
  
[SCREEN DESIGN 
TẠO KỲ THI] 
 
2 
TRẠNG THÁI 
KỲ THI 
- Một kì thi sẽ có 3 trạng thái đó là: 
draft, public, done. 
- Draft: là trạng thái miêu tả kỳ thi 
được tạo ra nhưng chưa được hệ 
thống thông báo về sự tồn tại đến 
người chấm và người tham gia. 
Đây là trạng thái mặc định khi tạo 
kỳ thi. 
- Public: là trạng thái miêu tả kỳ thi 
đã có đầy đủ những thông tin liên 
quan như ngày bắt đầu, ngày kết 
thúc, người tham gia, người chấm, 
●​ Chuyển trạng thái từ 
Draft sang Public mà 
không đủ các thông 
tin của kỳ thi như 
người thi, người 
chấm, đề thi (DH03) 
 
●​ Screen Design:  
 
​
​
Page 65 of 96 
 


--- PAGE 75 ---

 
Training System 
System Requirement Specification 
 
 
đề thi. Khi người tạo kỳ thi chuyển 
sang trạng thái public, hệ thống sẽ 
tự động gửi thông báo đến những 
người có liên quan đến kỳ thi đó.  
- Done: là trạng thái của kỳ thi khi 
số điểm của toàn bộ người thi 
được submit lên hệ thống.  
- Manager có thể chuyển trạng thái 
từ Draft sang Public khi các thông 
tin trong kỳ thi đã được cập nhật 
đầy đủ 
- Hệ thống sẽ làm nhiệm vụ chuyển 
trạng thái từ Public sang Done khi 
toàn bộ số điểm của toàn bộ người 
tham gia thi được submit 
 
3 
NGÀY BẮT 
ĐẦU KỲ THI 
- Đây là ngày bắt đầu của kỳ thi 
- Manager sẽ nhấn vào icon 
datepicker để chọn ngày tháng 
năm mà kỳ thi sẽ bắt đầu 
●​ Để trống ngày bắt 
đầu (DH02) 
●​ Trong trường hợp kỳ 
thi diễn ra trong một 
ngày ngày bắt đầu và 
ngày kết thúc sẽ 
trùng nha 
 
●​ Screen Design: 
[SCREEN DESIGN 
TẠO KỲ THI] 
 
4 
NGÀY KẾT 
THÚC KỲ THI 
- Đây là ngày kết thúc của kỳ thi 
- Manager sẽ click vào icon 
datepicker để chọn ngày tháng 
năm mà kỳ thi sẽ kết thúc 
 
●​ Để trống ngày kết 
thúc (DH02) 
 
●​ Screen Design: 
[SCREEN DESIGN 
TẠO KỲ THI] 
 
5 
ĐỀ THI 
- Đây là  phần Manager sẽ thêm 
những đề thi vào kỳ thi 
- Manager sẽ chọn những đề thi có 
liên quan đến kỳ thi từ danh sách 
đề thi trong hệ thống 
- Sau khi Manager chọn xong 
những đề thi vào kỳ thi, hệ thống 
sẽ trở về màn hình hiển thị danh 
sách đề thi trong kỳ thi. 
- Từ màn hình này Manager có thể 
update những đề thi mới, hoặc bỏ 
đi những đề thi đã thêm trước đó 
 
 
●​
Screen Design: 
SCREEN DESIGN 
VIEW ĐỀ THI 
TRONG KỲ THI 
 
 
●​ Chức năng liên 
quan:  
[Hiển thị danh sách 
đề thi] 
6 
NGƯỜI THI 
- Đây là phần Manager sẽ thêm 
những người tham gia thi vào kỳ thi 
 
●​ Screen Design: 
​
​
Page 66 of 96 
 


--- PAGE 76 ---

 
Training System 
System Requirement Specification 
 
 
- Manager sẽ chọn những người sẽ 
tham gia vào kỳ thi từ danh sách tài 
khoản bằng cách select box vào 
user muốn chọn 
- Manager cũng có thể search tên 
tài khoản, lọc tài khoản theo 
department để thêm toàn bộ user 
trong department vào kỳ thi  
 
SCREEN DESIGN 
VIEW NGƯỜI 
THAM GIA 
●​ Chức năng liên 
quan: 
[Hiển thị danh sách 
tài khoản] 
[Search tài khoản] 
[Filter tài khoản] 
 
7 
NGƯỜI CHẤM 
THI 
- Đây là phần Manager sẽ thêm 
người chấm thi vào kỳ thi 
- Manager sẽ chọn người chấm 
vào kỳ thi từ danh sách tài khoản 
bằng cách select box vào user 
muốn chọn 
- Manager cũng có thể search tên 
tài khoản, lọc tài khoản theo các 
tiêu chí để tìm ra user phù hợp cho 
việc chấm thi. 
 
 
●​ Screen Design: 
●​ Chức năng liên 
quan: 
[Hiển thị danh sách 
tài khoản] 
[Search tài khoản] 
[Filter tài khoản] 
 
 
 
MÃ 
MESSAGE 
DH01 
“Tên kì thi không được để trống” 
DH02 
“Thời gian kì thi không được để trống” 
DH03 
“Kỳ Thi chưa đủ thông tin để chuyển sang public” 
SCREEN DESIGN TẠO KỲ THI: 
​
​
Page 67 of 96 
 


--- PAGE 77 ---

 
Training System 
System Requirement Specification 
 
 
 
4.5.4.1.2.​
Clone Kỳ Thi 
 
❖​ Actor : User Manager, admin gọi chung actor 
❖​ Purpose : actor tạo 1 bản sao kỳ thi từ danh sách các kỳ thi 
❖​ Require : 
 ​ Actor nhìn vào màn hình home sau đó vào mục quản lý kỳ thi để nhìn danh sách các kỳ thi 
 ​ Từ màn hình danh sách các kỳ thi chúng ta có thể [SORT KỲ THI], [FILTER KỲ THI], 
[SEARCH KỲ THI] . 
 ​ Sau khi tìm được kỳ thi mà chúng ta muốn tạo bản sao thì nhấn vào biểu tượng clone sẽ 
hiện ra 1 popup có các thông số giống như kỳ thi ban đầu bao gồm các trường: 
STT 
Tiêu đề 
Giải thích 
Ngoại lệ 
1 
Tên kỳ thi 
“Tên của kỳ thi" thêm mã 
hậu tố để phân biệt với kỳ 
thi mà nó clone vd: 01,02 
Không được trống, nếu không điền gì thì 
sẽ có thông báo HA_01 
2 
Trạng thái 
Mặc định là draft, không 
thể sửa được trường này, 
chỉ có thể sửa khi vào chi 
tiết của kỳ thi đó . 
 
3 
Thời gian thi 
Có 2 mục datepicker để 
chọn thời gian bắt đầu và 
kết thúc của kỳ thi 
Không được để trống, nếu không điền gì 
thì sẽ có thông báo HA_02 
 ​ Sau khi clone có các chức năng: [Cập nhật Kỳ Thi] như kỳ thi bình thường 
MÃ 
MESSAGE 
HA_01 
“Tên kì thi không được để trống” 
HA_02 
“Thời gian kì thi không được để trống” 
 
 
​
​
Page 68 of 96 
 


--- PAGE 78 ---

 
Training System 
System Requirement Specification 
 
 
❖​ Screen design: 
 
4.5.4.2.​
View List Kỳ Thi 
 
❖​ Actor : Manager 
❖​ Purpose: Manager xem danh sách kỳ thi, từ danh sách đó Manager có thể filter, search, sort kỳ thi 
theo các tiêu chí 
CHỨC 
NĂNG 
MÔ TẢ YÊU CẦU 
NGOẠI LỆ (Error Message) 
CHỨC NĂNG 
LIÊN QUAN 
VIEW LIST KỲ 
THI 
- Sau khi chọn chức năng Quản Lý Kỳ 
Thi, hệ thống sẽ hiển thị ra màn hình 
view list kỳ thi. Dữ liệu của kỳ thi sẽ 
được trình bày dưới dạng bảng dữ 
liệu 
- Các trường của kỳ thi được hiển thị 
trong bảng dữ liệu bao gồm Tên Kỳ 
Thi, Ngày Bắt đầu, Ngày kết thúc, 
Người tạo, Trạng Thái, Mã Code Kỳ 
Thi (nếu có) 
- Trong màn hình view list cũng có một 
trường để select box tương ứng với 
 
●​ Screen Design: 
SCREEN DESIGN 
VIEWLIST KỲ THI 
  
●​ Chức năng liên 
quan:  
[SORT KỲ THI],  
[FILTER KỲ THI],  
[SEARCH KỲ THI] 
​
​
Page 69 of 96 
 


--- PAGE 79 ---

 
Training System 
System Requirement Specification 
 
 
từng kỳ thi, trường select box có thể 
được sử dụng để chọn toàn bộ kỳ thi 
được hiển thị ra. 
- Mặc định khi view list kỳ thi, filter sẽ 
được mặc định là all theo tất cả các 
trường. Sort sẽ được sắp xếp mặc 
định là draft được đưa lên đầu tiên 
 
SORT KỲ THI - Từ những trường được hiển thị trong 
bảng dữ liệu view list, Manager có thể 
sắp xếp tăng dần, giảm dần, alphabel, 
ngày/tháng/theo các trường dữ liệu có 
trong bảng. 
- Mặc định tất cả những kỳ thi có trạng 
thái là Draft sẽ được sắp xếp lên đầu 
tiên 
- VD: Trường người tạo sẽ sắp xếp 
theo alphabel, trường ngày bắt đầu, 
ngày kết thúc sẽ được sắp xếp theo 
thứ tự mới nhất đến cũ nhất 
 
 
●​ Screen Design: 
SCREEN DESIGN 
VIEWLIST KỲ THI 
 
●​ Chức năng liên 
quan: 
[VIEW 
LIST KỲ THI] 
FILTER KỲ 
THI 
- Từ những trường được hiển thị trong 
bảng dữ liệu view list, Manager có thể 
thực hiện filter kỳ thi theo các trường 
như tên kỳ thi, trạng thái, ngày bắt 
đầu, ngày kết thúc, người tạo, mã 
code kỳ thi 
- Mặc định khi view list kỳ thi, filter sẽ 
được mặc định là all theo tất cả các  
trường.  
 
●​ Screen Design: 
SCREEN DESIGN 
VIEWLIST KỲ THI 
 
●​ Chức năng liên 
quan: 
[VIEW 
LIST KỲ THI] 
SEARCH KỲ 
THI 
- Từ những trường được hiển thị trong 
bảng dữ liệu view list, Manager có thể 
thực hiện search kỳ thi theo tên kỳ thi, 
hoặc mã code của kỳ thi 
 
 
●​ Screen Design: 
SCREEN DESIGN 
VIEWLIST KỲ THI 
 
●​ Chức năng liên 
quan: 
[VIEW 
LIST KỲ THI] 
 
 
 
SCREEN DESIGN VIEWLIST KỲ THI 
​
​
Page 70 of 96 
 


--- PAGE 80 ---

 
Training System 
System Requirement Specification 
 
 
 
4.5.4.3.​
View Detail Kỳ Thi 
 
❖​ Actor: Manager 
❖​ Purpose : Manager có thể xem những thông tin của kỳ thi như thời gian, trạng thái, đề thi trong kì 
thi, người tham gia, người chấm từ danh sách kỳ thi đã có 
❖​ Requirement: 
o​
Manager sau khi log in vào hệ thống, và chọn chức năng quản lý kì thi, màn hình sẽ hiển thị 
ra list kì thi đã tạo trước đó 
o​
Manager click vào tên tương ứng với từng kì thi để hiển thị ra detail của kỳ thi 
o​
Phần Detail của Kỳ Thi sẽ hiển thị các mục thông tin: thông tin chung, người tham gia, 
người chấm đề thi. 
CHỨC NĂNG 
MÔ TẢ YÊU CẦU 
NGOẠI 
LỆ (Error 
Message) 
CHỨC NĂNG LIÊN 
QUAN 
THÔNG 
TIN 
KỲ 
THI 
- Ở mục thông tin kỳ thi hệ thống sẽ phải hiển 
thị ra những thông tin: Tên kỳ thi, Người Tạo, 
Trạng Thái, Thời gian bắt đầu, Thời gian kết 
thúc, Số lượng người tham gia  
- Tạo mã code kỳ thi: 
●​ Sau khi actor vào xem chi tiết kỳ thi 
nhấn vào tạo mã thi, hệ thống sẽ tự 
sinh ra 1 mã 15 ký tự ngẫu nhiên 
(gồm số và chữ) có trạng thái expired 
 
●​ Screen Design: 
[SCREEN DESIGN 
VIEW ] 
●​
Chức năng liên quan:  
​
​
Page 71 of 96 
 


--- PAGE 81 ---

 
Training System 
System Requirement Specification 
 
 
và public, khi mã code được tạo trạng 
thái mặc định là public, sau khi mã 
code được dùng thì nó chuyển trạng 
thái thành expired. 
●​ Sau khi thi xong và submit thì kết quả 
sẽ được hiển thị trong danh sách thí 
sinh trong chi tiết của kỳ thi đó và mã 
code chuyển trạng thái thành expired. 
Không xóa mã code đi 
 
NGƯỜI THAM GIA 
THI 
- Ở mục người tham gia, hệ thống sẽ hiển thị 
ra những người tham gia kỳ thi dưới dạng 
bảng dữ liệu bao gồm các trường tên Tài 
khoản, department, position, Email, Full 
Name và column check box. 
- Ứng với từng tài khoản, Manager có thể 
click vào tài khoản, hệ thống sẽ chuyển sang 
màn hình hiển thị điểm của user trong kỳ thi 
đó. 
- Ở mục này, hệ thống cũng có thể hiển thị 
được một thanh search người tham gia, một 
icon “thêm người tham gia”, một icon “xóa 
người tham gia”, và  
- Hệ thống cũng có thể hiển thị được các 
chức năng như filter, sort trong list người 
tham gia 
 
 
●​ Screen Design: 
SCREEN DESIGN VIEW 
NGƯỜI THAM GIA 
 
●​
Chức năng liên quan:  
[Filter Người Tham Gia 
        [Sort Người Tham 
Gia] 
 
[Seach Người Tham Gia] 
[UPDATE NGƯỜI THAM 
GIA THI ] 
 
NGƯỜI CHẤM 
- Ở mục người chấm thi, hệ thống sẽ hiển thị 
ra danh sách người chấm thi dưới dạng bảng 
bao gồm các thông tin Tên người chấm, 
department và column check box 
- Hệ thống cũng hiển thị ra những chức năng 
như thêm người chấm, xóa người chấm 
 
 
●​ Screen Design: 
●​
Chức năng liên quan:  
[UPDATE NGƯỜI CHẤM] 
 
ĐỀ THI 
- Ở mục đề thi, hệ thống sẽ hiển thị ra danh 
sách đề thi dưới dạng bảng bao gồm các 
thông tin Tên Đề Thi, Thể Loại Đề Thi, Số 
lượng câu hỏi, thời gian thi, người tạo và 
column check box. 
- Hệ thống cũng hiển thị ra những chức năng 
như thêm đề thi, bỏ đề thi ra khỏi kỳ thi 
 
●​ Screen Design: 
SCREEN DESIGN VIEW 
ĐỀ THI TRONG KỲ THI 
 
●​
Chức năng liên quan:  
[UPDATE ĐỀ THI] 
 
BÀI THI 
-  Ở mục bài thi, hệ thống sẽ hiển thị ra danh 
sách bài dưới dạng bảng bao gồm các thông 
 
●​ Screen Design: 
​
​
Page 72 of 96 
 


--- PAGE 82 ---

 
Training System 
System Requirement Specification 
 
 
tin, Tài Khoản, Bài Thi, Điểm Trắc Nghiệm, 
Điểm Tự Luận 
- Hệ thống cũng hiển thị ra những chức năng 
như Tài Khoản, Bài Thi, Điểm Trắc Nghiệm, 
Điểm Tự Luận 
- Khi Manager click trực tiếp vào tên mỗi bài 
thi, hệ thống sẽ hiển thị ra chi tiết của bài thi 
mà member đã làm. 
 
SCREEN DESIGN VIEW 
BÀI THI TRONG KỲ THI 
 
●​ Chức năng liên quan:  
[Filter Bài Thi] 
[Search Bài Thi] 
[Sort Bài Thi] 
[Chi Tiết Bài Thi] 
BÁO CÁO 
- Ở mục báo cáo, hệ thống sẽ hiển thị ra 
những biểu đồ thể hiện những thông tin như 
tổng số đề thi, tổng số câu hỏi, tổng số thí 
sinh, Điểm trung bình, Số lượng người tham 
gia, số lượng người không tham gia. 
- Hệ thống cũng hiển thị ra chức năng Print  
để in ra báo cáo của kỳ thi 
 
●​ Screen Design: 
[ Screen design báo cáo 
kỳ thi ] 
●​
Chức năng liên quan:  
[Report về kỳ thi] 
 
 
4.5.4.3.1.​
Filter Người Tham Gia 
❖​ Purpose : Manager filter người tham gia vào kỳ thi 
❖​ Requirement: 
o​
Trong danh sách những người tham gia thi ở view detail, manager có thể filter 
người tham gia theo tiêu chí department, điểm trắc nghiệm, điểm tự luận, 
position 
o​
Mặc định filter sẽ theo điều kiện là all 
 
4.5.4.3.2.​
Seach Người Tham Gia 
❖​ Purpose : Manager search người tham gia vào kỳ thi 
❖​ Requirement: 
o​
Trong danh sách những người tham gia thi ở view detail, manager có thể search 
người tham gia theo tên. 
4.5.4.3.3.​
Sort Người Tham Gia 
❖​ Purpose : Manager sort người tham gia vào kỳ thi 
❖​ Requirement: 
o​
Trong danh sách những người tham gia thi ở view detail, manager có thể sort 
người tham gia theo alphabel, thứ tự cao thấp tùy từng trường được hiển thị 
trong bảng dữ liệu. 
4.5.4.3.4.​
Filter Bài Thi 
❖​ Purpose : Manager filter bài thi trong kỳ thi 
❖​ Requirement: 
o​ Trong danh sách những bài thi mà người tham gia đã làm, manager có thể filter 
bài thi theo các trường tên tài khoản, thể loại, điểm trắc nghiệm, điểm tự luận. 
4.5.4.3.5.​
Sort Bài Thi 
❖​ Purpose : Manager sort bài thi trong kỳ thi 
❖​ Requirement: 
​
​
Page 73 of 96 
 


--- PAGE 83 ---

 
Training System 
System Requirement Specification 
 
 
o​ Trong danh sách những bài thi mà người tham gia đã làm, manager có thể sort 
bài thi theo các trường tên tài khoản, thể loại, điểm trắc nghiệm, điểm tự luận 
theo thứ tự alphabel với các trường dạng text hoặc từ cao xuống thấp với các 
trường dạng số. 
4.5.4.3.6.​
Search Bài Thi 
❖​ Purpose : Manager sort bài thi trong kỳ thi 
❖​ Requirement: 
o​ Trong danh sách những bài thi mà người tham gia đã làm, manager có thể 
search bài thi theo trường tên account tham gia thi. 
4.5.4.3.7.​
Chi Tiết Bài Thi 
❖​ Actor: Manager 
❖​ Purpose: Manager xem chi tiết một bài thi của thí sinh 
❖​ Flow: 
o​
Từ màn hình chi tiết của 1 kỳ thi, manager nhìn vào danh sách bài thi, bấm 
vào bài thi để xem chi tiết bài thi đó, chi tiết của bài thi sẽ lưu lại các đáp án 
mà thí sinh đã làm . 
o​
Thông tin chi tiết hiển thị sẽ bao gồm: Tên đề thi, tên thí sinh, thể loại đề, 
thời gian làm thực tế/thời gian quy đinh, điểm tự luận/số câu hỏi, điểm trắc 
nghiệm/số câu hỏi. 
o​
Nội dung hiển thị các câu hỏi trắc nghiệm,tự luận có trong đề, ngay bên phải 
có điểm, các đáp án đã disable không thể chỉnh sửa gì nữa. 
❖​ Screen design: 
​
​
Page 74 of 96 
 


--- PAGE 84 ---

 
Training System 
System Requirement Specification 
 
 
 
SCREEN DESIGN VIEW THÔNG TIN KỲ THI 
​
​
Page 75 of 96 
 


--- PAGE 85 ---

 
Training System 
System Requirement Specification 
 
 
 
 
 
 
 
 
 
 
SCREEN DESIGN VIEW ĐỀ THI TRONG KỲ THI 
​
​
Page 76 of 96 
 


--- PAGE 86 ---

 
Training System 
System Requirement Specification 
 
 
 
 
SCREEN DESIGN VIEW NGƯỜI THAM GIA 
 
 
​
​
Page 77 of 96 
 


--- PAGE 87 ---

 
Training System 
System Requirement Specification 
 
 
SCREEN DESIGN VIEW BÀI THI TRONG KỲ THI 
 
4.5.4.4.​
Cập nhật Kỳ Thi 
 
❖​ Actor: Manager 
❖​ Purpose : Manager update thông tin của kỳ thi đã tạo từ trước 
❖​ Requirements : 
o​
Manager sau khi log in vào hệ thống, và chọn chức năng quản lý kì thi, màn 
hình sẽ hiển thị ra list kì thi đã tạo trước đó 
o​
Manager click vào tên tương ứng với từng kì thi để hiển thị ra detail của kỳ thi 
 
 
CHỨC NĂNG 
MÔ TẢ YÊU CẦU 
NGOẠI LỆ 
(Error Message) 
CHỨC NĂNG LIÊN 
QUAN 
UPDATE 
THÔNG TIN KỲ 
THI 
- Ở từng mục tương ứng trong 
phần view detail kỳ thi khi hover 
chuột qua từng trường, màn 
hình sẽ hiển thị ra icon bút chì 
với các trường tên kỳ thi,  
người tạo,  hoặc icon date 
picker với các trường thời gian 
đề manager có thể click vào đó 
sau đó thay đổi những thông tin 
tương ứng. 
 
●​ Screen Design: 
●​
Chức năng liên 
quan:  
[View Detail Kỳ Thi] 
[TRẠNG THÁI KỲ 
THI] 
 
​
​
Page 78 of 96 
 


--- PAGE 88 ---

 
Training System 
System Requirement Specification 
 
 
- Ở mục trạng thái kỳ thi, 
Manager có thể chủ động thay 
đổi trạng thái kỳ thi nhưng phải 
đảm bảo các ngoại lệ được định 
nghĩa ở mục Trạng Thái Kỳ Thi 
- Ở mục này tất cả những thông 
tin thay đổi sẽ được lưu lại sau 
khi Manager click vào button 
Apply 
 
UPDATE 
NGƯỜI THAM 
GIA THI 
- Ở mục người tham gia thi trong 
view detail, manager có thể 
update thêm những user vào thi 
hoặc bỏ đi những user đã được 
thêm vào trước đó. 
 
●​ Screen Design: 
●​
Chức năng liên 
quan:  
[View Detail Kỳ Thi] 
 
UPDATE 
NGƯỜI CHẤM 
- Ở mục người chấm thi trong 
view detail, manager có thể 
update thêm những user vào 
chấm thi hoặc bỏ đi những user 
chấm thi đã được thêm vào 
trước đó. 
 
●​ Screen Design: 
●​
Chức năng liên 
quan:  
[View Detail Kỳ Thi] 
 
UPDATE ĐỀ 
THI 
- Ở mục người chấm thi trong 
view detail, manager có thể 
update thêm những đề thi vào 
kỳ thi hoặc bỏ đi những đề thi đã 
được thêm vào trước đó. 
 
●​ Screen Design: 
●​
Chức năng liên 
quan:  
[View Detail Kỳ Thi] 
 
UPDATE BÁO 
CÁO 
- Ở mục báo cáo trong view 
detail, hệ thống sẽ tự cập nhật 
những thay đổi thông tin trong 
hệ thống để tự cập nhật lại dữ 
liệu, từ đó biểu đồ sẽ được thay 
đổi.  
 
●​ Screen Design: 
●​
Chức năng liên 
quan:  
[View Detail Kỳ Thi] 
 
SCREEN DESIGN UPDATE THÔNG TIN KỲ THI 
 
MÔ TẢ MÀN HÌNH 
❖​ Actor : User Manager 
❖​ Purpose : User Manager sửa người chấm thi 
❖​ Require:  
o​
User Manager sau khi log in vào hệ thống, và chọn chức năng quản lý kì thi, 
màn hình sẽ hiển thị ra list kì thi đã tạo trước đó 
o​
Từ màn hình view list kỳ thi, Manager click vào detail của kỳ thi muốn sửa, sau 
đó hệ thống sẽ hiển thị ra màn hình detail cho kỳ thi mà manager vừa lựa chọn. 
​
​
Page 79 of 96 
 


--- PAGE 89 ---

 
Training System 
System Requirement Specification 
 
 
o​
Sau đó manager sẽ tùy chọn từng mục thông tin cần update 
Cập nhật tên kỳ thi 
❖​ Flows : 
o​
Ở mục thông tin thời gian của từng kì thi, ta thay đổi bằng cách hover chuột vào 
mục thông tin này của kỳ thi. Sau đó một form input sẽ được hiện ra để Manager 
thay đổi tên của kỳ thi. 
o​
Manager click vào button Apply để lưu lại những thay đổi vừa update. 
Cập nhật thời gian của kỳ thi 
❖​ Flows: 
o​
Ở mục thông tên của kì thi, ta thay đổi bằng cách click vào date picker của ngày 
bắt đầu, và ngày kết thúc.  
o​
Sau đó Manager click vào button Apply để lưu lại những thay đổi. 
Cập nhật trạng thái của kỳ thi 
❖​ Flows: 
o​
Ở mục trạng thái của kỳ thi, ta thay đổi bằng cách click vào icon ► của trạng 
thái kỳ thi. Một dropdown list được xổ xuống bao gồm các trạng thái của kỳ thi. 
Nhưng khi chuyển trạng thái phải đảm bảo yêu cầu về ngoại lệ được miêu tả ở 
phần tạo kỳ thi  
o​
Sau đó Manager click vào button Apply để lưu lại những thay đổi. 
Cập nhật Đề thi 
❖​ Flows:  
o​
Ở mục ĐỀ THI, ta click vào form search để search những đề thi có trong kỳ thi 
o​
Manager muốn thêm đề thi vào kỳ thi, Manager sẽ click vào icon +, hệ thống sẽ 
redirect ra màn hình list đề thi trong hệ thống, sau đó manager sẽ click vào 
check box tương ứng với những đề thi muốn thêm  
o​
Manager sẽ click vào ADD để xác nhận thêm những đề thi đã chọn vào kỳ thi 
o​
Sau khi manager đã click vào ADD, hệ thống sẽ redirect lại tab Đề Thi trong 
view detail, lúc này danh sách Đề Thi của kỳ thi sẽ được cập nhật. 
o​
Manager muốn bỏ đi đề thi của kỳ thi, Manager sẽ click vào icon “thùng rác” 
tương ứng với đề thi muốn bỏ, đề thi đó sẽ được loại bỏ khỏi kỳ thi. 
Cập nhật người tham gia vào kỳ thi 
❖​ Flows:  
o​
Ở mục NGƯỜI THAM GIA, ta click vào form search để search những người 
tham gia có trong kỳ thi 
o​
Manager muốn thêm người tham gia vào kỳ thi, Manager sẽ click vào icon +, hệ 
thống sẽ redirect ra màn hình list account trong hệ thống, sau đó manager sẽ 
click vào check box tương ứng với những người tham gia muốn thêm. Ở mục 
này manager có thể search, sort, filter user theo các tiêu chí để tìm ra những 
user phù hợp. 
o​
Manager sẽ click vào ADD để xác nhận thêm người tham gia đã chọn vào kỳ thi 
o​
Sau khi manager đã click vào ADD, hệ thống sẽ redirect lại tab NGƯỜI THAM 
GIA trong view detail, lúc này danh sách user của kỳ thi sẽ được cập nhật. 
o​
Manager muốn bỏ đi người tham gia trong kỳ thi, Manager sẽ click vào icon 
“thùng rác” tương ứng với người tham gia muốn bỏ, người tham gia đó sẽ được 
loại bỏ khỏi kỳ thi. 
Cập nhật người chấm trong kỳ thi 
❖​ Flows: 
​
​
Page 80 of 96 
 


--- PAGE 90 ---

 
Training System 
System Requirement Specification 
 
 
o​
Ở mục NGƯỜI CHẤM THI, Manager muốn thêm người chấm vào kỳ thi, 
Manager sẽ click vào icon +, hệ thống sẽ redirect ra màn hình list account trong 
hệ thống, sau đó manager sẽ click vào check box tương ứng với những người 
chấm muốn thêm. Ở mục này manager có thể search, sort, filter user theo các 
tiêu chí để tìm ra những user phù hợp. 
o​
Manager sẽ click vào ADD để xác nhận thêm người chấm đã chọn vào kỳ thi 
o​
Sau khi manager đã click vào ADD, hệ thống sẽ redirect lại tab NGƯỜI CHẤM 
trong view detail, lúc này danh sách người chấm chi của kỳ thi sẽ được cập 
nhật. 
o​
Manager muốn bỏ đi người chấm trong kỳ thi, Manager sẽ click vào icon “thùng 
rác” tương ứng với người chấm muốn bỏ, người chấm đó sẽ được loại bỏ khỏi 
kỳ thi. 
4.5.4.5.​
Xóa Kỳ thi 
❖​ Actor : User Manager 
❖​ Purpose : User Manager xóa kỳ thi 
❖​ Requirements : 
o​
Từ danh sách kỳ thi được hiển thị ở phần view list kỳ thi. Manager chọn select 
box vào kỳ thi muốn xóa hoặc có thể chọn nhiều kỳ thi muốn xóa bằng cách 
chọn vào nhiều box tương ứng 
o​
Sau đó manager sẽ click vào button “Xóa” để thực hiện việc xóa những kỳ thi đã 
chọn 
o​
Hệ thống sẽ hiển thị ra một pop-up để xác nhận việc xóa hoặc hủy thao tác xóa. 
❖​ Other related functions: NA 
4.5.4.6.​
Chấm điểm tự luận 
❖​ Actor: User manager 
❖​ Purpose: Được sử dụng để chấm điểm cho bài test tự luận trong kì thi 
❖​ Request: 
o​
User manager khi tạo kì thi sẽ assign cho user member hoặc user manager khác 
để chấm các bài thi tự luận trong kì thi 
o​
Những người được gán để chấm bài tự luận sẽ có thể view được các gợi ý đáp 
án của bài thi tự luận để chấm theo khung điểm từ gợi ý đáp án 
 
 
4.5.4.7.​
Report về kỳ thi 
4.5.4.7.1.​
Xem report theo từng kỳ thi 
❖​ Actor: User manager, admin gọi chung là actor . 
❖​ Purpose: Được sử dụng để thống kê ra những thông tin tổng quan về 1 kỳ thi 
❖​ Requirements: 
o​
Vào chi tiết kỳ thi sau đó vào mục báo cáo của kỳ thi đó thì hệ thống sẽ chuyển 
đến màn hình chi tiết báo cáo bao gồm các trường như sau: 
STT 
Các trường hiển thị 
Giải thích 
1​
 
Tên kỳ thi 
Hiển thị thông tin kỳ thi 
2​
 
Người tạo kỳ thi 
Người tạo ra kỳ thi 
​
​
Page 81 of 96 
 


--- PAGE 91 ---

 
Training System 
System Requirement Specification 
 
 
3​
 
Người chấm thi 
Người được chọn chấm thi 
4​
 
Thời gian thi 
Thời gian kỳ thi diễn ra( đầy đủ 
ngày tháng năm) 
5​
 
Tổng số đề thi 
Tổng số câu hỏi trong đề thi 
6​
 
Tổng số câu hỏi 
Tổng số câu hỏi có trong đề thi 
7​
 
Số câu khó 
Tổng số câu hỏi khó 
8​
 
Số câu trung bình 
Tổng số câu hỏi trung bình 
9​
 
Số câu dễ 
Tổng số câu hỏi dễ 
10​  
Tổng số thí sinh 
Tổng số thí sinh 
11​  
Bảng phân loại theo thang điểm 
Sẽ phân theo các mức thang 
điểm điểm kém, điểm khá, điểm 
giỏi, tương ứng là số lượng thí 
sinh ứng với số điểm đó 
12​  
Số người không tham gia 
Số người không tham gia 
13​  
Điểm trung bình 
Điểm trung bình toàn kỳ thi 
 
o​
Tổng số đề thi, số câu hỏi dễ, khó, trung bình sẽ có biểu đồ tròn theo phần trăm. 
o​
Biểu đồ tròn thể hiện các tỉ lệ bảng phân loại thang điểm theo phần trăm. 
❖​ Other relevant functions: N/A 
❖​ Screen design báo cáo kỳ thi : 
​
​
Page 82 of 96 
 


--- PAGE 92 ---

 
Training System 
System Requirement Specification 
 
 
4.5.4.7.2.​
Xuất báo cáo theo từng kỳ thi 
❖​ Actor: User manager, admin gọi chung là actor 
❖​ Purpose: Actor có thể sử dụng chức năng này để xuất ra báo cáo của từng kỳ thi trong 
hệ thống. 
❖​ Requirements: 
o​
Sau khi actor xem qua báo cáo của từng kỳ thi muốn xuất báo cáo ra file pdf thì 
nhấn vào nút xuất file pdf, thì sẽ hiện ra 1 popup để chọn vị trí lưu file, sau khi 
nhấn save thì ta có file pdf bao gồm các trường như trong miêu tả [Xem report 
theo từng kỳ thi]  định dạng pdf. 
❖​ Other relevant functions: [Xem report theo từng kỳ thi] 
❖​ Screen design: 
 
 
5.​
Non-functional requirements  
Usability  
Hệ thống dung trong nội bộ CMC Global với những quy trình nghiệp vụ và quy định 
chung của công ty cũng như tập đoàn CMC 
Reliability  
N/A 
​
​
Page 83 of 96 
 


--- PAGE 93 ---

 
Training System 
System Requirement Specification 
 
 
Performance 
Supportability 
N/A 
Design Constraints 
Mockup Design 
On-line User Documentation and Help System Requirements 
N/A 
Purchased Components 
N/A 
Interfaces 
User Interfaces 
N/A 
Hardware Interfaces 
N/A 
Software Interfaces 
N/A 
Communications Interfaces 
N/A 
Environment 
Target Environment 
N/A 
Development Environment 
N/A 
Database 
N/A 
Licensing Requirements 
N/A 
​
​
Page 84 of 96 
 


--- PAGE 94 ---

 
Training System 
System Requirement Specification 
 
 
Legal, Copyright, and Other Notices 
N/A 
Applicable Standards 
N/A 
6.​
 Appendix 
N/A 
7.​
Wiki 
7.1.​
Message 
Tên Message 
Code Message 
Nội dung Message 
Mã code không tồn tại 
NDUY_01 
Mã Code không tồn tại 
Mã code không còn hiệu 
lực  
NDUY_02 
Mã code của kỳ thi đã hết 
hạn 
Form hiển thị 
NDUY_03 
Bạn có muốn thực hiện bài 
thi + “Tên bài thi” 
VD: Bạn có muốn thực 
hiện 
bài 
thi 
“Thi 
Sql 
beginner”  
½ Thời gian còn lại 
NDUY_04 
Bạn đã làm bài được ½ 
thời gian 
Thời gian còn lại còn 5 
phút 
NDUY_05 
Bạn còn 5 phút để làm bài  
Thời gian còn lại còn 2 
phút 
NDUY_06 
Bạn còn 2 phút để làm bài 
Message form xác nhận 
nộp bài 
NDUY_07 
Bạn có muốn nộp bài 
Form thông báo hết thời 
gian làm bài  
NDUY_08 
Bạn đã hết thời gian làm 
bài 
User name không đúng 
format 
NDUY_09 
User name không đúng 
định dạng 
Password 
không 
đúng 
format 
NDUY_10 
Password không đúng định 
dạng 
User name và Password 
không hợp lệ 
NDUY_11 
User name và password 
không hợp lệ 
​
​
Page 85 of 96 
 


--- PAGE 95 ---

 
Training System 
System Requirement Specification 
 
 
From > To 
NDUY_12 
Ngày “From” phải nhỏ hơn 
ngày “To” 
Form  
xác nhận submit 
điểm 
NDUY_13 
Bạn có muốn Submit Điểm 
không 
7.2.​
Format input, display 
7.2.1.​ Độ dài tối đa của 1 trường 
Nếu field = null thì sẽ hiển thị rỗng  
Nếu field != null và độ dài > 200 ký tự thì sẽ chỉ hiển thị 200 ký tự đầu tiên + dấu … 
7.2.2.​ Format Date 
Nếu date = null thì sẽ hiển thị rỗng 
 Nếu date != null thì sẽ hiển thị theo format: dd/mm/yyyy 
7.2.3.​ Format thời gian làm bài 
Nếu thời gian làm bài = null hoặc nhỏ hơn 0 thì sẽ hiển thị rỗng 
 Nếu thời gian làm bài != null và lớn hơn 0 thì sẽ hiển thị theo format: n + “p” (VD: 
30p) 
7.2.4.​ Format điểm thi 
Nếu điểm thi = null (chưa có điểm thi) hoặc điểm thi nhỏ hơn 0 hoặc lớn hơn 10 thì 
sẽ hiển thị rỗng 
 Nếu điểm thi != null và >= 0 và <= 10 thì sẽ hiển thị theo format là 1 số float (VD: 8, 
8.5) 
7.2.5.​ Format thời gian thi còn lại 
Hiển thị theo format như sau 
Nếu > 1 giờ thì theo format: h giờ mm phút ss giây 
Nếu < 1 giờ và > 0 giây thì theo format: mm phút ss giây 
7.2.6.​ Format user name 
User name phải có từ  5 🡪 15 ký tự 
7.2.7.​ Format Password 
Password phải có từ  5 🡪 15 ký tự 
7.2.8.​ Format Mã code của kỳ thi 
Mã code có 15 ký tự, có số, có chữ 
​
​
Page 86 of 96 
 


--- PAGE 96 ---

 
Training System 
System Requirement Specification 
 
 
Được sinh ngẫu nhiên, khi gen thì các mã code không được trùng nhau 
Mã code của kỳ thi có 2 trạng thái: expired, public 
7.2.9.​ Email 
Regex: 
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1
,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/   
7.2.10.​Phone number 
Regex: 
/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/ 
7.2.11.​Identity card number 
Regex:  
[0-9]{9} 
7.3.​
Technical 
7.3.1.​ Paging 
 ​ Trên các màn hình [View List] sẽ được phân trang cụ thể như sau: 
o​
Mặc định hệ thống sẽ hiển thị 20 record trên 1 page 
o​
Nếu tổng số record > 20 và không phải là page cuối cùng thì cho phép User 
có thể click vào button “Next” 
o​
Nếu tổng số record > 20 và không phải là page đầu tiên thì cho phép User có 
thể click vào button “Prev” 
 ​ Khi User click vào button “”Next”” thì hệ thống sẽ hiển thị 20 record tiếp theo 
 ​ Khi User click vào button “Prev” thì hệ thống sẽ hiển thị 20 record trước đó 
 ​ Ngoài ra trên màn hình còn hiển thị thông tin đang ở trang nào theo format: [page 
hiện tại] Of [Tổng số page] 
7.3.2.​ Search 
Search theo full text search 
 
 
​
​
Page 87 of 96 
 


