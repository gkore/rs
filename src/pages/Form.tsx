import "./Main.css"
import Card, { CardProps } from "../components/Card"
import React, { ReactNode, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

const countries = ["USA", "RUSSIA", "CHINA", "JAPAN"]

type FormValues = {
    name: string
    bday: Date
    country: string
    mailingSubscribe: boolean
    gender: "MALE" | "FEMALE"
    avatar: FileList | null
}

const FormItem: React.FC<{ children: ReactNode; showRequired: boolean }> = (
    props
) => {
    return (
        <>
            {props.children}
            {props.showRequired && (
                <span className="form-item-error">This field is invalid</span>
            )}
        </>
    )
}

const Form = () => {
    const [cards, setCards] = useState<Array<CardProps>>([])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        setCards([
            ...cards,
            {
                image:
                    data?.avatar != null &&
                    data.avatar.item != null &&
                    data.avatar.item(0) != null
                        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore This is done cuz data.avatar.item(0) is validated to be not null, but compiler doesn't think so
                          URL.createObjectURL(data.avatar.item(0))
                        : "https://kakogo-chisla.ru/wp-content/uploads/2022/06/Den-fotografii-prirody-2048x1363.jpg",
                header: `[${data.gender}] ${data.name}`,
                description: (
                    <>
                        <span>Birthday: {data.bday.toString()}</span>
                        <br />
                        <span>Country: {data.country}</span>
                        <br />
                        {data.mailingSubscribe && (
                            <>
                                <span>Subscribed to mailing!</span>
                                <br />
                            </>
                        )}
                    </>
                ),
            },
        ])
        reset()
    }

    return (
        <>
            <div>
                <h1>Form</h1> • <a href="#/">Go back</a>
                <div className="spacing" />
                <form data-testid={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <FormItem showRequired={!!errors.name}>
                        <input
                            placeholder="Your name"
                            {...register("name", {
                                required: true,
                                validate: (c) => /^[a-z\s0-9]{3,}$/gi.test(c),
                            })}
                        />
                    </FormItem>

                    <label htmlFor="bday">Birthday date:</label>
                    <FormItem showRequired={!!errors.bday}>
                        <input
                            id="bday"
                            type="date"
                            {...register("bday", { required: true })}
                        />
                    </FormItem>

                    <label htmlFor="country">Country:</label>
                    <FormItem showRequired={!!errors.country}>
                        <select
                            id="country"
                            {...register("country", { required: true })}
                        >
                            {countries.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </FormItem>

                    <label htmlFor="gender">Gender:</label>
                    <FormItem showRequired={!!errors.gender}>
                        <label>
                            <input
                                type="radio"
                                value="MALE"
                                {...register("gender", { required: true })}
                            />
                            {" Male"}
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="FEMALE"
                                {...register("gender", { required: true })}
                            />
                            {" Female"}
                        </label>
                    </FormItem>

                    <label htmlFor="avatar">Avatar:</label>
                    <FormItem showRequired={!!errors.avatar}>
                        <label>
                            {"Your avatar: "}
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                {...register("avatar", {})}
                            />
                        </label>
                    </FormItem>

                    <label htmlFor="mailingSubscribe">Additional:</label>
                    <FormItem showRequired={!!errors.mailingSubscribe}>
                        <label>
                            <input
                                type="checkbox"
                                {...register("mailingSubscribe", {})}
                            />
                            {" Subscribe to our mailings"}
                        </label>
                    </FormItem>

                    <input type="submit" value={"Create card"} />
                </form>
                <div className="spacing" />
                <div className="cardholder">
                    {cards.map((cardprops, i: number) => {
                        return <Card {...cardprops} key={i} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Form
