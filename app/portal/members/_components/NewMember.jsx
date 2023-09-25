"use client"

import {
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Card,
  Button
} from "@mui/material"
import { useForm } from "react-hook-form"

// TODO: Replace chapter list from chapters table in DB.
const chapterList = [
  { label: "Code Your Dreams" },
  { label: "CoderHeroes" },
  { label: "BloomTech" },
]

export default function NewMember() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const onSubmit = (values, event) => {
    event.preventDefault()
    console.log(values)
  }

  return (
    <>
      {/* TODO: Take in prop for which table to add a new instance. */}
      <div className="italic">Fill out the form to add a new member.</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          id="member-name"
          label="Member Name"
          variant="outlined"
          {...register("name", { required: "Member Name is required" })}
          error={Boolean(errors.name)}
          helperText="Enter the full name of the member to add"
        />
        <TextField
          required
          id="member-email"
          type="email"
          label="Email Address"
          {...register("email", { required: "Email is required" })}
          error={Boolean(errors.email)}
          helperText="Enter the email address of the member to be added"
        />
        {/* TODO: For a chapter admin, this should be a fixed field. For a super admin they should see a dropdown. */}
        <Autocomplete
          disablePortal
          id="chapter-name"
          options={chapterList}
          onInputChange={(event, newValue) => {
            event.preventDefault()
            setValue("chapter", newValue)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="Chapter"
              variant="outlined"
              helperText="Select the chapter the member is a part of"
            />
          )}
        />
        <Card variant="outlined" className="modal-card">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox
                {...register("role")}
                onChange={(e) => {
                  e.preventDefault()
                  setValue("role", e.target.checked)
              }}
                />}
              label="Make a Chapter Admin"
            />
          </FormGroup>
          <FormHelperText>
            If selected, this member will be able to add new chapter members
          </FormHelperText>
        </Card>
        <div>
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button variant="text">
              Close without saving
            </Button>
          </div>
      </form>
    </>
  )
}
