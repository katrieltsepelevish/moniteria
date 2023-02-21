import React from 'react';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useLoginUserMutation } from '../../../services/auth/authApi';

interface RegisterFormValues {
  email: string;
  password: string;
}

const initalFormValues: RegisterFormValues = {
  email: '',
  password: '',
};

interface ManualLoginFormProp {
  onSubmit?: () => Promise<void> | void;
}

const ManualLoginForm: React.FC<ManualLoginFormProp> = ({ onSubmit }) => {
  const [errors, setErrors] = React.useState<any>(null);

  const [formValues, setFormValues] =
    React.useState<RegisterFormValues>(initalFormValues);

  const [loginUser] = useLoginUserMutation();

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

      await loginUser({ ...formValues }).unwrap();

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
        label="email"
        type="email"
        placeholder="example@moniteria.com"
        error={errors?.email}
        onChange={handleInputChange}
        value={formValues?.email}
      />
      <Input
        label="password"
        type="password"
        placeholder="•••••••"
        error={errors?.password}
        onChange={handleInputChange}
        value={formValues?.password}
      />
      <Button darkMode text="Sign in with email" onClick={handleSubmit} />
    </div>
  );
};

export default React.memo(ManualLoginForm);
