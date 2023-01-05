import { useContext } from 'react';
import { Container } from '@mantine/core';

import PageMeta from '../../components/layout/components/PageMeta';
import PageHeader from '../../components/layout/components/PageHeader';
import PageContainer from '../../components/layout/components/PageContainer';
import { Tabs } from '../../design-system';
import { AuthContext } from '../../store/authContext';
import { BrandingForm } from './tabs';

const BRANDING = 'Branding';

export function BrandPage() {
  const { currentOrganization } = useContext(AuthContext);

  const menuTabs = [
    {
      value: BRANDING,
      content: <BrandingForm isLoading={!currentOrganization} organization={currentOrganization} />,
    },
  ];

  return (
    <PageContainer>
      <PageMeta title="Brand" />
      <PageHeader title="Brand" />
      <Container fluid mt={15} ml={5}>
        <Tabs loading={!currentOrganization} menuTabs={menuTabs} defaultValue={BRANDING} />
      </Container>
    </PageContainer>
  );
}