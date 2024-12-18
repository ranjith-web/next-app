import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './localeSwitcherSelect';

export default function LocaleSwitcher() {
    const translateMessage = useTranslations('LocaleSwitcher');
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect
            defaultValue={locale}
            items={[
                {
                    value: 'en',
                    label: translateMessage('en')
                },
                {
                    value: 'de',
                    label: translateMessage('de')
                }
            ]}
            label={translateMessage('label')}
        />
    );
}