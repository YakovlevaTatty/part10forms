import React, { useState, useEffect } from "react";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import api from "../../api";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";

const EditForm = ({ userId }) => {
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [user, setUser] = useState();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    if (user) {
        data.name = user.name;
        data.email = user.email;
        data.profession = user.profession;
        data.sex = user.sex;
        data.qualities = user.qualities.name;
    }
    console.log(
        "user",
        // user.filter((u) => u._id === userId)

        data,
        user && user.name,
        userId
    );
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };
    return (
        <div className="container mt-5">
            {user && (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Электронная почта"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                    />
                    <SelectField
                        label="Выбери свою профессию"
                        value={data.profession}
                        onChange={handleChange}
                        defaultOption="Choose..."
                        options={professions}
                    />
                    <RadioField
                        options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" }
                        ]}
                        value={data.sex}
                        name="sex"
                        onChange={handleChange}
                        label="Выберите ваш пол"
                    />
                    <MultiSelectField
                        options={qualities}
                        onChange={handleChange}
                        defaultValue={data.qualities}
                        name="qualities"
                        label="Выберите ваши качества"
                    />
                    <button
                        className="btn btn-primary w-100 mx-auto"
                        type="submit"
                    >
                        Обновить
                    </button>
                </form>
            )}
        </div>
    );
};

EditForm.propTypes = {
    userId: PropTypes.string
};

export default EditForm;
