const { test, expect } = require('@playwright/test');
const {webkit} = require('playwright');
 
// Customize trả về  2 tên noti theo mong muốn
const mockResponse= {
        "results": [
          {
            userFullName: "Group 4",
            id: "U1zv0WYjzWxW",
            uuid: "fd98d469-7753-4ff4-ae61-89aac4296570",
            userId: "GjWovtg2hr",
            commentId: "q2c4cm5eEXZW",
            transactionId: "iYh3sbLQiMD_",
            isRead: false,
            createdAt: "2023-03-29T02:21:16.950Z",
            modifiedAt: "2024-03-07T20:03:07.766Z"
          },
          {
            userFullName: "Group 4 v2",
            id: "RFnNTK3Fqt4_",
            uuid: "5d6d6b8a-e928-4e4c-bae9-18f687ee61a4",
            userId: "GjWovtg2hr",
            transactionId: "nn4GPzD6XxOw",
            status: "requested",
            isRead: false,
            createdAt: "2023-11-22T00:16:00.668Z",
            modifiedAt: "2024-03-07T02:28:31.160Z"
 
          }
        ]
      }
 
test('Simulating getting a response from an API', async({page}) => {
    await page.route('http://localhost:3001/notifications', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockResponse)
        })
 
    })
    await page.goto ('http://localhost:3000')
    await page.getByLabel('Username').fill('Heath93');
    await page.getByLabel('Password').fill('s3cret');
    await page.getByRole('button', {name: 'Sign in'}).click();
 
    await page.click('[data-test="sidenav-notifications"]')
    await page.pause()
})
 
//Thêm các noti
test('Modify API response', async({page}) => {
    await page.route('http://localhost:3001/notifications', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.results.push(
        {
            userFullName: "Phuong Nguyen",
            id: "lOYfFmTdm80d",
            uuid: "7d936027-413e-41d2-a3a3-a5d07dec40e7",
            userId: "GjWovtg2hr",
            likeId: "bg8F4haR2zc0",
            transactionId: "3WSDPwyh3xt",
            isRead: false,
            createdAt: "2023-04-14T07:47:23.751Z",
            modifiedAt: "2024-03-07T09:33:24.043Z"
        },
        {
          userFullName: "Thao Nguyen",
          id: "abVP52Im99R1",
          uuid: "4c193573-2b56-4479-a949-d460b2b18ad8",
          userId: "GjWovtg2hr",
          transactionId: "EXPizgkX0bwV",
          status: "received",
          isRead: false,
          createdAt: "2023-10-21T14:56:33.288Z",
          modifiedAt: "2024-03-07T07:47:21.096Z"
      },
      {
        userFullName: "Thai Trang",
        id: "a1iMNiZhGjaA",
        uuid: "8066024e-9b0f-4921-b3a6-3fd0cbc293a0",
        userId: "GjWovtg2hr",
        transactionId: "EXPizgkX0bwV",
        status: "requested",
        isRead: false,
        createdAt: "2023-07-25T23:30:03.903Z",
        modifiedAt: "2024-03-07T00:01:24.151Z"
    })
        route.fulfill({response,json})
    });
    await page.goto('http://localhost:3000');
    await page.getByLabel('Username').fill('Heath93');
    await page.getByLabel('Password').fill('s3cret');
    await page.getByRole('button', {name: 'Sign in'}).click();
 
    await page.click('[data-test="sidenav-notifications"]');
    await page.pause();
});
 
 
test('Modify response', async({page}) => {
  await page.route('http://localhost:3001/notifications', async route => {
      const response = await route.fetch();
      const json = await response.json();
      // Thực hiện lọc kết quả trong JSON
      const filteredResults = json.results.filter(item => item.userFullName === "Ted Parisian");
      console.log(filteredResults);
 
      // Cập nhật phản hồi JSON và fulfill
      await route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify({ results: filteredResults })
      });
  });
 
  await page.goto('http://localhost:3000');
  await page.getByLabel('Username').fill('Heath93');
  await page.getByLabel('Password').fill('s3cret');
  await page.getByRole('button', {name: 'Sign in'}).click();
 
  await page.click('[data-test="sidenav-notifications"]');
  await page.pause();
});