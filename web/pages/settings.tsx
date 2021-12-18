import AuthGuard from "components/AuthGuard";
import Loading from "components/Loading";
import Sidebar from "components/Sidebar";
import useSWR from "swr";
import { fetcher } from "utils/api-helpers";

function Keys() {
  const { data, error } = useSWR("/admin/secret_key", fetcher);

  if (!data && !error) return <Loading />;
  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Secret key
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This key is has administrator permissions on all the endpoints.
                Please keep it safe.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="secretKey"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Secret key
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="secretKey"
                          disabled
                          id="secretKey"
                          value={data.key}
                          className="focus:ring-green-500 focus:border-green-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 disabled:opacity-80"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div> */}
    </>
  );
}

function Settings() {
  return (
    <Sidebar>
      <div className="flex-1 flex items-stretch overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="flex-1 text-2xl font-bold text-gray-900">
                Settings
              </h1>
            </div>
            <div className="mt-10">
              <Keys />
            </div>
          </div>
        </main>
      </div>
    </Sidebar>
  );
}

export default function Main() {
  return (
    <AuthGuard>
      <Settings />
    </AuthGuard>
  );
}
