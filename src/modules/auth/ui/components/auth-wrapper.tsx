type Props = {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription: string;
};

export const AuthWrapper = ({
  children,
  headerLabel,
  headerDescription,
}: Props) => {
  return (
    <div className="flex flex-1 flex-col gap-5 items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{headerLabel}</h1>
        <p className="text-balance text-sm text-muted-foreground">
          {headerDescription}
        </p>
      </div>
      <div className="w-full max-w-xs">{children}</div>
    </div>
  );
};
