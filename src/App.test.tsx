import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it } from "vitest"

import { ClearApp, RoutedApp } from "./App"

describe("App", () => {
    it("Main page", () => {
        render(<RoutedApp />)

        const sr = screen.getByText("See results")
        const inpt = screen.getByPlaceholderText("How can I help you?")

        expect(sr).toBeVisible()
        expect(sr).toBeEnabled()

        sr.click()
        //after click something should be changed (in future)

        expect(inpt).toBeVisible()
        expect(inpt).toBeEnabled()

        fireEvent.change(inpt, {
            target: {
                value: "test",
            },
        })

        expect(screen.getByPlaceholderText("How can I help you?")).toHaveValue(
            "test"
        )

        expect(
            screen.getByRole("heading", {
                level: 1,
            })
        ).toHaveTextContent("Main page")
    })
    it("About us", () => {
        render(
            <MemoryRouter initialEntries={["/about"]}>
                <ClearApp />
            </MemoryRouter>
        )

        expect(
            screen.getByRole("heading", {
                level: 1,
            })
        ).toHaveTextContent("Abous us")
    })
    it("Form", () => {
        render(
            <MemoryRouter initialEntries={["/form"]}>
                <ClearApp />
            </MemoryRouter>
        )

        const nameInput = screen.getByPlaceholderText("Your name")
        const dateInput = screen.getByLabelText("Birthday date:")
        const countryInput = screen.getByLabelText("Country:")
        const maleRadio = screen.getByLabelText("Male")
        const subscribeCheckbox = screen.getByLabelText(
            "Subscribe to our mailings"
        )

        const avatarInput = screen.getByLabelText("Your avatar:")

        const file = new File(["file content"], "filename.txt", {
            type: "text/plain",
        })

        const input = document.createElement("input")
        input.setAttribute("type", "file")
        input.setAttribute("name", "file-upload")
        input.multiple = false
        const mockFileList = Object.create(input.files)
        mockFileList[0] = file
        Object.defineProperty(mockFileList, "length", { value: 1 })

        const formData = {
            name: "John Doe",
            bday: "2022-04-02",
            country: "USA",
            gender: "MALE",
            mailingSubscribe: true,
            avatar: null,
        }

        fireEvent.input(nameInput, { target: { value: formData.name } })
        fireEvent.input(dateInput, { target: { value: formData.bday } })
        fireEvent.change(countryInput, { target: { value: formData.country } })
        fireEvent.click(maleRadio)
        fireEvent.click(subscribeCheckbox)
        fireEvent.change(avatarInput, { target: { files: [] } })

        fireEvent.submit(screen.getByTestId("form"))

        waitFor(() =>
            screen.getByText(`[${formData.gender}] ${formData.name}`)
        ).then((r) => {
            expect(r).toBeInTheDocument()
        })

        fireEvent.input(nameInput, { target: { value: "" } })
        fireEvent.submit(screen.getByTestId("form"))

        waitFor(() => screen.getByText(`This field is invalid`)).then((r) => {
            expect(r).toBeInTheDocument()
        })

        expect(
            screen.getByRole("heading", {
                level: 1,
            })
        ).toHaveTextContent("Form")
    })
    it("Renders not found if not found", () => {
        render(
            <MemoryRouter initialEntries={["/thisis100percentnotfound"]}>
                <ClearApp />
            </MemoryRouter>
        )

        expect(
            screen.getByRole("heading", {
                level: 1,
            })
        ).toHaveTextContent("Not Found")
    })
})
