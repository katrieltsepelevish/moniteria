import React from 'react';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useRegisterUserMutation } from '../../../services/auth/authApi';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const initalFormValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
};

interface ManualRegistrationFormProp {
  onSubmit?: () => Promise<void> | void;
}

const ManualRegistrationForm: React.FC<ManualRegistrationFormProp> = ({
  onSubmit,
}) => {
  const [errors, setErrors] = React.useState<any>(null);

  const [formValues, setFormValues] =
    React.useState<RegisterFormValues>(initalFormValues);

  const [registerUser] = useRegisterUserMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      await registerUser({ ...formValues }).unwrap();

      await onSubmit?.();
    } catch (err: any) {
      if (err?.data?.errors) {
        setErrors(err?.data?.errors);
      }
    }
  };

  return (
    <div className="flex gap-[8px] flex-col">
      <Input
        label="name"
        type="text"
        error={errors?.name}
        onChange={handleInputChange}
      />
      <Input
        label="email"
        type="email"
        placeholder="example@moniteria.com"
        error={errors?.email}
        onChange={handleInputChange}
      />
      <Input
        label="password"
        type="password"
        placeholder="•••••••"
        error={errors?.password}
        onChange={handleInputChange}
      />
      <Button darkMode text="Sign up with email" onClick={handleSubmit} />
    </div>
  );
};

export default React.memo(ManualRegistrationForm);
