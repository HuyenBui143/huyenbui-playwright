// B1: highlight element tren trang web
// B2: chup anh man hinh va luu vao file

import { Locator, Page } from "@playwright/test"
import { mkdirSync } from "fs"
import { join } from "path"

// nhan cac tham so
// param1: page -> object page cua playwright
// param2: locator -> object Locator cua playwright
// param3: testName -> de dat folder luu hinh co highlight
// Param4: stepName -> de dat tren file hinh chup

export async function highlightAndScreenshot(
    page: Page,
    locatior: Locator,
    testName: string,
    stepName: string
): Promise<void>{
    // B1: tao ten folder
    const folderName = testName.toLowerCase()

    // B2: tao duong dan de luu folder
    // _dirname: thu muc (folder) chua file code
    // .. : quay len thu muc cha
    const screenshotDir = join(__dirname, "..", "screenshot", folderName)

    // B3: tao folder
    mkdirSync(screenshotDir, {recursive: true})
    
    // B4: highlight element
    await locatior.evaluate((el) =>{
        // them vien do
        (el as HTMLElement).style.border = "4px solid red";
        // them mau nen: vang
        (el as HTMLElement).style.backgroundColor = "yellow";
    })
    await page.waitForTimeout(1000)

    // B5: chup anh man hinh va luu vao file
    const filePath = join(screenshotDir, `${stepName}.png`)
    await page.screenshot({path: filePath})
}