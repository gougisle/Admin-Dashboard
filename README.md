# Admin-Dashboard
- Front-End: ReactJs
- Middle-Tier: .NetCore/C#
- Back-End: Microsoft SQL Server

# Summary
This Admin Dashboard was created for a T-shirt printing company, is meant to be a _one-stop-shop_ for data and statistics on Users, Sales, and Completed Orders. When an Admin logged into their account, he/she would be presented with the total number of users, number of confirmed vs. un-confirmed users, as well as the number of users with paused or deactivated accounts. Additionally they would be shown the cards that displayed the total number of Completed Orders and Sales revenue in the current year, quarter, month and week respectively. Lastly they could interact with a bar graph that broke down yearly Sales Revenue (and Completed Orders) by month. They could choose whatever year they desired to inspect and see specific numbers by month.

# React Components
- **AdminDash.jsx -->** Parent compnents(page) 
- **OrderChart.jsx -->** Dynamic graph component for dislaying data on Completed Orders 
- **QuickviewTotals.jsx -->** Component with 3 cards that displayed up-to-date totals for Users, Revenue and Completed Orders
- **SalesChart.jsx -->** Dynamic graph component for dislaying data on Revenue. 
- **SingleOrdersCard.jsx -->** Single card component used to display varied temporal data on Revenue
- **SingleSalesCard.jsx -->** "     "     "     "     "     "      " on Completed Orders
- **SingleUsersCard.jsx -->** Component that displayed stats on Users, based on respective status (used with mapper)



