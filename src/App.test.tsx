import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it } from "vitest"

import { ClearApp, RoutedApp } from "./App"

describe("App", () => {
    it("Renders hello world", () => {
        render(<RoutedApp />)

        expect(
            screen.getByRole("heading", {
                level: 1,
            })
        ).toHaveTextContent("Hello World")
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
