'use client'
import { Container } from "@/app/_components/container";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { useTranslation } from "react-i18next";

const PollingManagementPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Card className="p-4">
        <CardContent className="flex flex-col md:flex-row gap-5 justify-between">
          <Input
            className="lg:w-1/2"
            type="text"
            placeholder={t("pollingManagement:searchForStateManager")}
            aria-label={t("pollingManagement:searchForStateManager")}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default PollingManagementPage;
