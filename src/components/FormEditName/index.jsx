import Input from '../Input'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
//*components
import Button from '../Button'
//*selectors
import {
    selectEditName,
    selectEditValue,
    selectProfile,
    selectToken,
    selectEditProfile,
} from '../../utils/selectors'
//*actions
import { getEditFirstName, getEditLastName } from './editValueReducer'
import { fetchOrUpdateEditProfile } from './actions'

const StyledForm = styled.form`
    display: ${({ state }) => (state === 'open' ? 'block' : 'none')};
    margin-top: 10px;
    background: white;
    color: black;
    padding: 20px;
`

export default function FormEditName() {
    const dispatch = useDispatch()

    const token = useSelector(selectToken)
    const currentToken = token.data.token

    const profile = useSelector(selectProfile)
    const { data } = profile
    const { firstName, lastName } = data !== null && data

    const editProfile = useSelector(selectEditProfile)

    const editValue = useSelector(selectEditValue)
    const { editFirstName, editLastName } = editValue

    const editNameState = useSelector(selectEditName)

    function test(data, editValue, editData) {
        if (editValue !== null && editValue !== '') {
            return editValue
        } else {
            if (editData !== null) {
                return editData
            }
            return data
        }
    }

    // console.log('le prénom lors du login' + '     ' + firstName)
    // console.log('la value input' + '     ' + editFirstName)
    // console.log(
    //     'le nouveau prénom stocké' + '     ' + editProfile.data.firstName
    // )

    test(firstName, editFirstName, editProfile.data.firstName)
    test(lastName, editLastName, editProfile.data.lastName)

    const handleEditName = (e) => {
        e.preventDefault()
        dispatch(
            fetchOrUpdateEditProfile(
                currentToken,
                test(firstName, editFirstName, editProfile.data.firstName),
                test(lastName, editLastName, editProfile.data.lastName)
            )
        )
    }

    return (
        <StyledForm onSubmit={handleEditName} noValidate state={editNameState}>
            <Input
                label="First Name"
                type="text"
                id="firstName"
                autoComplete="on"
                event={(e) => dispatch(getEditFirstName(e.target.value))}
                value={editFirstName !== null ? editFirstName : ''}
            />

            <Input
                label="Name"
                type="text"
                id="name"
                autoComplete="on"
                value={editLastName !== null ? editLastName : ''}
                event={(e) => dispatch(getEditLastName(e.target.value))}
            />
            <Button title={'Save'} name="EDIT" />
        </StyledForm>
    )
}
