export default function IletisimPage() {
  return (
    <div className="bg-[var(--background)] px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold text-[var(--text)]">Iletisim</h1>
        <p className="mt-4 text-[var(--text-secondary)]">
          Sorulariniz icin bize{" "}
          <a className="text-[var(--primary)] underline" href="mailto:destek@dijitalmankenim.com">
            destek@dijitalmankenim.com
          </a>{" "}
          adresinden ulasabilirsiniz.
        </p>
      </div>
    </div>
  );
}
