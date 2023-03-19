import { fireEvent, render, screen } from "@testing-library/react"
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
