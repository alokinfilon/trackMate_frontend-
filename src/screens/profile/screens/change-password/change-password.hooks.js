import { useState } from 'react';
import { useAlertModal } from '../../../../components';
import { useTranslation } from '../../../../context';

export const useChangePassword = (navigation) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  const { showModal } = useAlertModal();
  const { t } = useTranslation();

  const handleSave = async () => {
    const cleanCurrent = currentPassword.trim();
    const cleanNew = newPassword.trim();
    const cleanConfirm = confirmPassword.trim();

    if (!cleanCurrent || !cleanNew || !cleanConfirm) {
      showModal({
        title: t('common.error'),
        message: t('changePassword.missing'),
        variant: 'error',
        confirmText: 'OK',
      });
      return;
    }

    if (cleanNew.length < 8) {
      showModal({
        title: t('common.error'),
        message: t('changePassword.weak'),
        variant: 'error',
        confirmText: 'OK',
      });
      return;
    }

    if (cleanNew !== cleanConfirm) {
      showModal({
        title: t('common.error'),
        message: t('changePassword.mismatch'),
        variant: 'error',
        confirmText: 'OK',
      });
      return;
    }

    setSaving(true);
    // Simulate API delay
    setTimeout(() => {
      setSaving(false);
      showModal({
        title: t('common.success'),
        message: t('changePassword.successMsg'),
        variant: 'success',
        confirmText: t('common.finish'),
        onConfirm: () => {
          navigation.goBack();
        },
      });
    }, 1200);
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    currentPasswordVisible,
    setCurrentPasswordVisible,
    newPasswordVisible,
    setNewPasswordVisible,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
    saving,
    handleSave,
  };
};
